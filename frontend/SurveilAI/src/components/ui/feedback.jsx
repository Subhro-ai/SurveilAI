import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    feedback: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (name === 'feedback') {
      setCharacterCount(value.length);
    }
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitted feedback:', {
        ...formData,
        rating
      });
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phoneNumber: '',
          feedback: ''
        });
        setRating(0);
        setCharacterCount(0);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-purple-400 mb-2">Your Feedback Matters</h2>
          <p className="text-gray-400 text-center mb-6">Help us improve our CCTV surveillance system</p>
          
          {isSubmitted ? (
            <div className="bg-purple-900 border border-purple-700 text-white px-4 py-6 rounded-lg text-center mb-4 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-1">Thank You!</h3>
              <p>Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`transform transition-all duration-300 ${activeField === 'name' ? 'scale-102' : ''}`}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
              
              <div className={`transform transition-all duration-300 ${activeField === 'phoneNumber' ? 'scale-102' : ''}`}>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phoneNumber')}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition-all duration-300"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => handleRatingHover(star)}
                      onMouseLeave={handleRatingLeave}
                      className="focus:outline-none transform transition-all duration-200 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 ${
                          (hoverRating || rating) >= star
                            ? 'text-purple-400'
                            : 'text-gray-600'
                        } transition-colors duration-200`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-xs text-center text-purple-400 animate-fade-in">
                    You selected {rating} {rating === 1 ? 'star' : 'stars'}
                  </p>
                )}
              </div>
              
              <div className={`transform transition-all duration-300 ${activeField === 'feedback' ? 'scale-102' : ''}`}>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-1">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  onFocus={() => handleFocus('feedback')}
                  onBlur={handleBlur}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none transition-all duration-300"
                  placeholder="Share your experience with our surveillance system..."
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${characterCount > 150 ? 'text-purple-400' : 'text-gray-500'}`}>
                    {characterCount} characters
                  </span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-4 rounded-md hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 font-medium transform hover:scale-102 hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-950 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            Your feedback helps us enhance our CCTV surveillance system. We may contact you via SMS for follow-up questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;