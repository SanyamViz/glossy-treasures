import React, { useState, useEffect } from 'react';
import styles from './ResinOptions.module.css';

export default function ResinOptions({ colors = [], sizes = [], frameSizes = [], standMaterials = [], basePrice = 0, customSize = null, personalizationConfig = {}, onPriceChange, onOptionsChange }) {
  const [selectedColor, setSelectedColor] = useState(colors[0] || { label: 'Custom', hex: 'custom' });
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedFrameSize, setSelectedFrameSize] = useState(frameSizes[0] || null);
  const [selectedStand, setSelectedStand] = useState(standMaterials[0] || null);
  const [customColor, setCustomColor] = useState('');
  const [customSizeText, setCustomSizeText] = useState(customSize || '');
  const [msg, setMsg] = useState('');
  const [personName, setPersonName] = useState('');
  const [personDate, setPersonDate] = useState('');
  const [photos, setPhotos] = useState([]); // Up to 4 photos
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Update total price whenever frame size or stand material changes
  useEffect(() => {
    let totalPrice = basePrice;
    if (selectedSize) {
      totalPrice = selectedSize.price || basePrice;
    } else if (selectedFrameSize) {
      totalPrice = selectedFrameSize.price; 
    }
    
    if (selectedStand) {
      totalPrice += (selectedStand.priceAdd || 0);
    }
    
    if (onPriceChange) onPriceChange(totalPrice);

    // Also notify parent of all selected options
    if (onOptionsChange) {
      let finalSize = selectedSize?.label || selectedFrameSize?.label || customSize || null;
      if (finalSize === 'Custom' && customSizeText) {
        finalSize = customSizeText;
      }

      onOptionsChange({
        color: selectedColor ? (selectedColor.hex === 'custom' ? `Custom: ${customColor}` : `${selectedColor.label || selectedColor.name}`) : null,
        colorHex: selectedColor?.hex || null,
        size: finalSize,
        stand: selectedStand?.label || null,
        personalization: {
          name: personName,
          date: personDate,
          message: msg,
          photos: photos
        }
      });
    }
  }, [selectedSize, selectedFrameSize, selectedStand, selectedColor, customColor, customSizeText, msg, personName, personDate, photos, basePrice, customSize, onPriceChange, onOptionsChange]);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (photos.length + files.length > 4) {
      alert("You can only upload up to 4 photos.");
      return;
    }

    setIsUploadingPhoto(true);

    try {
      const newUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          newUrls.push(data.url);
        } else {
          alert('Upload failed: ' + (data.error || 'Unknown error'));
        }
      }
      setPhotos(prev => [...prev, ...newUrls].slice(0, 4));
    } catch (err) {
      console.error(err);
      alert('Photo upload failed. Please try again.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleFrameSizeChange = (s) => {
    setSelectedFrameSize(s);
  };

  const handleStandChange = (m) => {
    setSelectedStand(m);
  };

  return (
    <div className={styles.options}>
      {colors.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Color Palette</span>
          <div className={styles.swatchRow}>
            {colors.map(c => (
              <button
                key={c.id || c.name}
                className={`${styles.colorBtn} ${selectedColor?.name === c.name ? styles.colorActive : ''}`}
                onClick={() => setSelectedColor(c)}
                title={c.label || c.name}
              >
                {c.hex === 'custom' ? (
                  <span className={styles.swatchInner} style={{ background: 'var(--bg-card)' }}>✏️</span>
                ) : (
                  <span className={styles.swatchInner} style={{ background: c.hex }} />
                )}
                <span className={styles.colorLabel}>{c.label || c.name}</span>
              </button>
            ))}
          </div>
          {selectedColor.hex === 'custom' && (
            <input
              type="text"
              className={styles.customInput}
              placeholder="Describe your color idea..."
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
          )}
        </div>
      )}

      {sizes.length > 0 && (
        <div className={styles.optionGroup}>
          <div className={styles.groupHeader}>
            <span className={styles.label}>Choose Size</span>
            {selectedSize && <span className={styles.selectedValue}>{selectedSize.label === 'Custom' ? customSizeText : selectedSize.label}</span>}
          </div>
          <div className={styles.chipScroll}>
            {sizes.map(s => (
              <button
                key={s.id || s.label}
                className={`${styles.chip} ${selectedSize?.label === s.label ? styles.active : ''}`}
                onClick={() => {
                  setSelectedSize(s);
                }}
              >
                {s.label} {s.price ? `— ₹${s.price}` : ''}
              </button>
            ))}
          </div>
          {selectedSize?.label === 'Custom' && (
            <input
              type="text"
              className={styles.customInput}
              placeholder="Enter dimensions (e.g. 15x15 cm)..."
              value={customSizeText}
              onChange={(e) => setCustomSizeText(e.target.value)}
            />
          )}
        </div>
      )}

      {frameSizes.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Frame Size</span>
          <div className={styles.chipScroll}>
            {frameSizes.map(s => (
              <button
                key={s.id}
                className={`${styles.chip} ${selectedFrameSize?.id === s.id ? styles.active : ''}`}
                onClick={() => handleFrameSizeChange(s)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {standMaterials.length > 0 && (
        <div className={styles.optionGroup}>
          <span className={styles.label}>Stand Material</span>
          <div className={styles.chipScroll}>
            {standMaterials.map(m => (
              <button
                key={m.id}
                className={`${styles.chip} ${selectedStand?.id === m.id ? styles.active : ''}`}
                onClick={() => handleStandChange(m)}
              >
                {m.label} {m.priceAdd > 0 ? `(+₹${m.priceAdd})` : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {personalizationConfig?.active && (
        <div className={styles.personalCard}>
          <p className={styles.personalTitle}>Personalize This Piece</p>
          <p className={styles.personalSub}>Add a name, date, or message — cast right into the resin.</p>

          <div className={styles.fields}>
            {personalizationConfig.fields?.includes('Name') && (
              <input
                type="text"
                placeholder="Name / Initial"
                className={styles.input}
                value={personName}
                onChange={e => setPersonName(e.target.value)}
              />
            )}
            {personalizationConfig.fields?.includes('Date') && (
              <input
                type="text"
                placeholder="Date (e.g. 14 Feb 2024)"
                className={styles.input}
                value={personDate}
                onChange={e => setPersonDate(e.target.value)}
              />
            )}
            {personalizationConfig.fields?.includes('Message') && (
              <div className={styles.textareaWrap}>
                <textarea
                  placeholder="Special message..."
                  className={styles.textarea}
                  rows="2"
                  maxLength="80"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <span className={styles.counter}>{msg.length}/80</span>
              </div>
            )}
            
            {personalizationConfig.fields?.includes('Photo') && (
              <div className={styles.photoUploadWrap}>
                {photos.length < 4 && (
                  <label className={styles.photoLabel}>
                    {isUploadingPhoto ? 'Uploading...' : 'Upload Photos (Up to 4)'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={handlePhotoUpload} 
                      className={styles.fileInput} 
                      disabled={isUploadingPhoto || photos.length >= 4}
                    />
                  </label>
                )}
                {photos.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {photos.map((p, idx) => (
                      <div key={idx} className={styles.photoPreview} style={{ position: 'relative' }}>
                        <img src={p} alt="Uploaded personalization" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                        <button 
                          onClick={() => setPhotos(photos.filter((_, i) => i !== idx))} 
                          className={styles.removePhotoBtn}
                          style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', border: 'none', width: '20px', height: '20px', cursor: 'pointer' }}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <p className={styles.note}>Made to order · Crafted in 5–7 days · Ships with a handwritten note</p>
        </div>
      )}
    </div>
  );
}
