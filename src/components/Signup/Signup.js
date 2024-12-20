import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import './Signup.css';


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
// Move countries array outside component
const countries = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: 'https://flagcdn.com/w20/us.png' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: 'https://flagcdn.com/w20/au.png' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: 'https://flagcdn.com/w20/de.png' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: 'https://flagcdn.com/w20/jp.png' },
  { name: 'China', code: 'CN', dialCode: '+86', flag: 'https://flagcdn.com/w20/cn.png' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: 'https://flagcdn.com/w20/in.png' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: 'https://flagcdn.com/w20/br.png' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: 'https://flagcdn.com/w20/it.png' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: 'https://flagcdn.com/w20/es.png' },
  { name: 'Mexico', code: 'MX', dialCode: '+52', flag: 'https://flagcdn.com/w20/mx.png' },
  { name: 'South Korea', code: 'KR', dialCode: '+82', flag: 'https://flagcdn.com/w20/kr.png' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: 'https://flagcdn.com/w20/nl.png' },
  { name: 'Russia', code: 'RU', dialCode: '+7', flag: 'https://flagcdn.com/w20/ru.png' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: 'https://flagcdn.com/w20/se.png' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: 'https://flagcdn.com/w20/ch.png' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: 'https://flagcdn.com/w20/sg.png' },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: 'https://flagcdn.com/w20/no.png' },
  { name: 'Denmark', code: 'DK', dialCode: '+45', flag: 'https://flagcdn.com/w20/dk.png' },
  { name: 'New Zealand', code: 'NZ', dialCode: '+64', flag: 'https://flagcdn.com/w20/nz.png' },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: 'https://flagcdn.com/w20/ie.png' },
  { name: 'Belgium', code: 'BE', dialCode: '+32', flag: 'https://flagcdn.com/w20/be.png' },
  { name: 'Austria', code: 'AT', dialCode: '+43', flag: 'https://flagcdn.com/w20/at.png' },
  { name: 'Portugal', code: 'PT', dialCode: '+351', flag: 'https://flagcdn.com/w20/pt.png' },
  { name: 'Greece', code: 'GR', dialCode: '+30', flag: 'https://flagcdn.com/w20/gr.png' },
  { name: 'Israel', code: 'IL', dialCode: '+972', flag: 'https://flagcdn.com/w20/il.png' },
  { name: 'Poland', code: 'PL', dialCode: '+48', flag: 'https://flagcdn.com/w20/pl.png' },
  { name: 'Turkey', code: 'TR', dialCode: '+90', flag: 'https://flagcdn.com/w20/tr.png' }
];;

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const filteredCountries = useMemo(() => {
    return countries.filter(country =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
        country.dialCode.includes(countrySearch)
    );
}, [countrySearch, countries]); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry) {
      setError('Please select a country code');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const fullPhoneNumber = `${selectedCountry.dialCode}${formData.phone}`;
    
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        ...formData,
        phone: fullPhoneNumber,
        country: selectedCountry.code
      });

      if (response.data.success) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setError('');
        // Clear form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          zipCode: '',
          city: '',
          password: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.userExists) {
        setError('User already exists. Please login instead.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(error.response?.data?.message || 'An error occurred during registration');
      }
    }
  };


  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Sign Up</h2>
          <p>Create your account</p>
        </div>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="input-group phone-group">
            <div className="country-select" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedCountry ? (
                <>
                  <img src={selectedCountry.flag} alt={selectedCountry.name} />
                  <span>{selectedCountry.dialCode}</span>
                </>
              ) : (
                <span>Select</span>
              )}
              <ChevronDown className="chevron" />
            </div>
            {isDropdownOpen && (
              <div className="country-dropdown">
                <input
                  type="text"
                  placeholder="Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="country-search"
                />
                <div className="country-list">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.code}
                      className="country-item"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <img src={country.flag} alt={country.name} />
                      <span>{country.name} ({country.dialCode})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="input phone-input"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code (Optional)"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" className="signup-btn">
            SIGN UP
          </button>

          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;