import React from 'react';
import ToyCard from './ToyCard';
import { categoriesList, ageGroupsList, ravetSocieties } from '../data/ravetSocieties';
import { Filter, RotateCcw, Sparkles, MapPin, Grid, Layers } from 'lucide-react';

export default function ExchangeFeed({
  toys,
  selectedCategory,
  setSelectedCategory,
  selectedAge,
  setSelectedAge,
  selectedSociety,
  setSelectedSociety,
  searchTerm,
  setSearchTerm,
  onSelectToy,
  onRequestSwap
}) {

  // Filter toys based on active category, age group, society, and search term
  const filteredToys = toys.filter((toy) => {
    const matchesCategory = selectedCategory === 'all' || toy.category === selectedCategory;
    const matchesAge = selectedAge === 'all' || toy.ageGroup === selectedAge;
    const matchesSociety = selectedSociety === 'all' || toy.society === selectedSociety;
    const matchesSearch = !searchTerm || 
      toy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toy.societyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      toy.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesAge && matchesSociety && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedAge('all');
    setSelectedSociety('all');
    setSearchTerm('');
  };

  const isFiltered = selectedCategory !== 'all' || selectedAge !== 'all' || selectedSociety !== 'all' || searchTerm !== '';

  return (
    <section id="exchange-feed-section" style={{ padding: '30px 0 60px' }}>
      <div className="app-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="badge-eco">Live Neighborhood Catalog</span>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>({filteredToys.length} Available)</span>
            </div>
            <h2 style={{ fontSize: '1.85rem', color: '#0F172A' }}>
              Explore Disinfected Toys in Ravet
            </h2>
          </div>

          {/* Quick Clear Filter Button */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#EF4444', borderColor: '#FCA5A5' }}
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '20px',
          scrollbarWidth: 'none'
        }}>
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '99px',
                  border: isActive ? 'none' : '1px solid #E2E8F0',
                  background: isActive ? 'var(--primary-gradient)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 14px rgba(255, 90, 95, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls Bar (Age Group & Ravet Society Selectors) */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          
          {/* Age Group Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={14} /> Age:
            </span>
            {ageGroupsList.map((age) => (
              <button
                key={age.id}
                onClick={() => setSelectedAge(age.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  border: selectedAge === age.id ? '1px solid #8B5CF6' : '1px solid #F1F5F9',
                  background: selectedAge === age.id ? '#F3E8FF' : '#F8FAFC',
                  color: selectedAge === age.id ? '#6B21A8' : '#64748B',
                  fontWeight: selectedAge === age.id ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {age.label}
              </button>
            ))}
          </div>

          {/* Ravet Society Dropdown Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#2563EB" /> Society:
            </span>
            <select
              value={selectedSociety}
              onChange={(e) => setSelectedSociety(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#1E293B',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {ravetSocieties.map((soc) => (
                <option key={soc.id} value={soc.id}>
                  {soc.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Toys Grid */}
        {filteredToys.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '24px'
          }}>
            {filteredToys.map((toy) => (
              <ToyCard
                key={toy.id}
                toy={toy}
                onSelectToy={onSelectToy}
                onRequestSwap={onRequestSwap}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '50px 20px',
            textAlign: 'center',
            border: '1.5px dashed #CBD5E1'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍🧸</div>
            <h3 style={{ fontSize: '1.25rem', color: '#1E293B', marginBottom: '8px' }}>
              No toys found matching your criteria
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px' }}>
              Try broadening your category or society filters, or list a new toy for parents in your society!
            </p>
            <button onClick={resetFilters} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
