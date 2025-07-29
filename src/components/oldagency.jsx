
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const servicesData = {
  seo: {
    title: 'SEO Services',
    subServices: [
      { id: 'local-seo', name: 'Local SEO' },
      { id: 'on-page-seo', name: 'On-Page SEO' },
      { id: 'off-page-seo', name: 'Off-Page SEO' },
      { id: 'technical-seo', name: 'Technical SEO' },
    ],
  },
  webDev: {
    title: 'Web Development',
    subServices: [
      { id: 'frontend', name: 'Frontend Development' },
      { id: 'backend', name: 'Backend Development' },
      { id: 'full-stack', name: 'Full Stack Development' },
    ],
  },
  digitalMarketing: {
    title: 'Digital Marketing',
    subServices: [
      { id: 'ppc', name: 'PPC Advertising' },
      { id: 'email', name: 'Email Marketing' },
      { id: 'content', name: 'Content Strategy' },
    ],
  },
  socialMedia: {
    title: 'Social Media',
    subServices: [
      { id: 'smm', name: 'Social Media Management' },
      { id: 'ads', name: 'Social Media Ads' },
      { id: 'influencer', name: 'Influencer Marketing' },
    ],
  },
  contentMarketing: {
    title: 'Content Marketing',
    subServices: [
      { id: 'blog', name: 'Blog Content' },
      { id: 'video', name: 'Video Content' },
      { id: 'infographic', name: 'Infographics' },
    ],
  },
};

const NewAgency = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '',
    industry: '',
    saleValue: '',
    conversionRate: '',
    monthlyTraffic: '',
  });
  const [showDropdown, setShowDropdown] = useState(null);

  const handleServiceToggle = (serviceId) => {
    setShowDropdown(showDropdown === serviceId ? null : serviceId);
  };

  const handleSubServiceSelect = (serviceId, subServiceId) => {
    setSelectedServices((prev) => {
      const currentSelections = prev[serviceId] || [];
      if (currentSelections.includes(subServiceId)) {
        const updatedSelections = {
          ...prev,
          [serviceId]: currentSelections.filter((id) => id !== subServiceId),
        };
        if (updatedSelections[serviceId].length === 0) {
          const { [serviceId]: _, ...rest } = updatedSelections;
          return rest;
        }
        return updatedSelections;
      } else {
        return {
          ...prev,
          [serviceId]: [...currentSelections, subServiceId],
        };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = () => {
    const selectedServiceDetails = Object.entries(selectedServices)
      .filter(([_, subServiceIds]) => subServiceIds.length > 0)
      .map(([serviceId, subServiceIds]) => {
        const service = servicesData[serviceId];
        const subServiceNames = subServiceIds.map((id) =>
          service.subServices.find((s) => s.id === id)?.name
        );
        return `Service: ${service.title}\nPackages: ${subServiceNames.join(', ')}`;
      })
      .join('\n\n');

    const subject = encodeURIComponent('New Service Request Summary');
    const body = encodeURIComponent(`
Hi CubixSEO Team,

--- Client Info ---
Name: ${userInfo.name || 'N/A'}
Email: ${userInfo.email || 'N/A'}
Phone: ${userInfo.phone || 'N/A'}
Company: ${userInfo.company || 'Individual'}
Website: ${userInfo.website || 'N/A'}
Budget: $${userInfo.budget || 'N/A'}

--- Selected Services ---
${selectedServiceDetails || 'No services selected'}

--- ROI Inputs ---
Industry: ${userInfo.industry}
Average Sale Value: $${userInfo.saleValue}
Current Website Conversion Rate: ${userInfo.conversionRate}%
Current Monthly Website Traffic: ${userInfo.monthlyTraffic}

Timestamp: ${new Date().toLocaleString()}

Thank you!
    `);

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=needhelpvcc@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  const isSeoSelected = selectedServices['seo']?.length > 0;
const labels = ['1st Month', '2nd Month', '3rd Month'];

const trafficGrowthData = {
  labels,
  datasets: [
    {
      label: 'Website Traffic',
      data: [1200, 3400, 7500],
      fill: false,
      borderColor: '#4F46E5',
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
};

const keywordRankingsData = {
  labels,
  datasets: [
    {
      label: 'Keywords in Top 10',
      data: [10, 35, 60],
      fill: false,
      borderColor: '#10B981',
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
};

const backlinksData = {
  labels,
  datasets: [
    {
      label: 'Backlinks Acquired',
      data: [15, 50, 130],
      fill: false,
      borderColor: '#F59E0B',
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
};

const monthlyROIProjectionData = {
  labels,
  datasets: [
    {
      label: 'Estimated ROI ($)',
      data: [300, 1100, 2500],
      fill: false,
      borderColor: '#EF4444',
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
};

const packageComparisonData = {
  labels: ['Starter', 'Growth', 'Pro'],
  datasets: [
    {
      label: 'Keywords Rank Increase',
      backgroundColor: ['#60A5FA', '#34D399', '#FBBF24'],
      data: [30, 60, 120],
    },
  ],
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
};

  // const trafficGrowthData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: isSeoSelected ? 'Projected Monthly Traffic' : 'Website Traffic',
  //       data: isSeoSelected
  //         ? selectedServices['seo'].includes('on-page-seo') || selectedServices['seo'].includes('off-page-seo')
  //           ? [1000, 1500, 2200, 3000, 4000, 5000]
  //           : [500, 800, 1200, 1800, 2500, 3500]
  //         : [500, 800, 1200, 1800, 2500, 3500],
  //       borderColor: '#10B981',
  //       backgroundColor: 'rgba(16, 185, 129, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  //   options: {
  //     scales: {
  //       y: { beginAtZero: true, title: { display: true, text: 'Visitors' } },
  //     },
  //   },
  // };

  // const keywordRankingsData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Keyword Rankings',
  //       data: isSeoSelected
  //         ? selectedServices['seo'].includes('on-page-seo')
  //           ? [5, 10, 15, 20, 25, 30]
  //           : selectedServices['seo'].includes('off-page-seo')
  //           ? [3, 7, 12, 18, 22, 28]
  //           : [2, 4, 6, 8, 10, 12]
  //         : [0, 0, 0, 0, 0, 0],
  //       borderColor: '#EF4444',
  //       backgroundColor: 'rgba(239, 68, 68, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  //   options: {
  //     scales: {
  //       y: { beginAtZero: true, title: { display: true, text: 'Keywords in Top 10' } },
  //     },
  //   },
  // };

  // const backlinksData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Backlinks Gained',
  //       data: isSeoSelected
  //         ? selectedServices['seo'].includes('off-page-seo')
  //           ? [10, 25, 50, 80, 120, 160]
  //           : [5, 10, 15, 20, 25, 30]
  //         : [0, 0, 0, 0, 0, 0],
  //       borderColor: '#8B5CF6',
  //       backgroundColor: 'rgba(139, 92, 246, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  //   options: {
  //     scales: {
  //       y: { beginAtZero: true, title: { display: true, text: 'Backlinks' } },
  //     },
  //   },
  // };

  // const packageComparisonData = {
  //   labels: Object.keys(selectedServices)
  //     .filter((key) => selectedServices[key].length > 0)
  //     .map((key) => servicesData[key].title),
  //   datasets: [
  //     {
  //       label: 'Estimated ROI (%)',
  //       data: Object.keys(selectedServices)
  //         .filter((key) => selectedServices[key].length > 0)
  //         .map((key) => (key === 'seo' ? selectedServices[key].length * 50 : Math.floor(Math.random() * 50) + 50)),
  //       backgroundColor: 'rgba(59, 130, 246, 0.6)',
  //       borderColor: '#3B82F6',
  //       borderWidth: 1,
  //     },
  //   ],
  //   options: {
  //     scales: {
  //       y: { beginAtZero: true, title: { display: true, text: 'ROI (%)' } },
  //     },
  //   },
  // };

  // const monthlyROIProjectionData = {
  //   labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
  //   datasets: [
  //     {
  //       label: 'Projected ROI ($)',
  //       data: isSeoSelected
  //         ? selectedServices['seo'].includes('on-page-seo') || selectedServices['seo'].includes('off-page-seo')
  //           ? [1000, 2000, 3500, 5000, 7000, 9000]
  //           : [500, 1000, 1800, 3000, 4500, 6000]
  //         : [500, 1000, 1800, 3000, 4500, 6000],
  //       borderColor: '#F59E0B',
  //       backgroundColor: 'rgba(245, 158, 11, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  //   options: {
  //     scales: {
  //       y: { beginAtZero: true, title: { display: true, text: 'ROI ($)' } },
  //     },
  //   },
  // };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold"
        >
          Cubix SEO Agency
        </motion.h1>
        <p className="text-lg md:text-xl mt-3">Transform Your Business with Expert Digital Solutions</p>
      </header>
<div className="max-w-7xl mx-auto px-4 py-16">
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Plans</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Starter Package */}
    <div className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Starter</h3>
      <p className="text-gray-500 mb-6">Perfect for small businesses starting SEO efforts.</p>
      <div className="text-4xl font-bold text-indigo-600 mb-6">$199<span className="text-base font-medium text-gray-500">/mo</span></div>
      <ul className="space-y-4 text-gray-700 text-sm mb-6">
        <li>✅ 5 Keywords Tracked</li>
        <li>✅ Monthly Report</li>
        <li>✅ Basic On-Page Optimization</li>
        <li>❌ Backlink Building</li>
        <li>❌ Blog Content</li>
      </ul>
    </div>

    {/* Professional Package */}
    <div className="border-2 border-indigo-600 rounded-xl p-8 shadow-2xl transform scale-105">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Professional</h3>
      <p className="text-gray-500 mb-6">For growing businesses focused on real SEO results.</p>
      <div className="text-4xl font-bold text-indigo-600 mb-6">$499<span className="text-base font-medium text-gray-500">/mo</span></div>
      <ul className="space-y-4 text-gray-700 text-sm mb-6">
        <li>✅ 20 Keywords Tracked</li>
        <li>✅ Bi-Weekly Report</li>
        <li>✅ On & Off-Page Optimization</li>
        <li>✅ Backlink Building (5/month)</li>
        <li>✅ 2 SEO Blog Posts</li>
      </ul>
    </div>

    {/* Enterprise Package */}
    <div className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise</h3>
      <p className="text-gray-500 mb-6">Custom strategies for high-growth and enterprise clients.</p>
      <div className="text-4xl font-bold text-indigo-600 mb-6">Custom</div>
      <ul className="space-y-4 text-gray-700 text-sm mb-6">
        <li>✅ Unlimited Keywords</li>
        <li>✅ Dedicated SEO Manager</li>
        <li>✅ Weekly Strategy Calls</li>
        <li>✅ Unlimited Backlinks</li>
        <li>✅ Custom Content Creation</li>
      </ul>
    </div>
  </div>
</div>

<section className="max-w-7xl mx-auto px-6 py-16">
  <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800 tracking-tight">🚀 Select Your Services</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {Object.keys(servicesData).map((serviceId) => (
      <motion.div
        key={serviceId}
        className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-indigo-600 mb-2">{servicesData[serviceId].title}</h3>
        <p className="text-gray-500 mb-4 text-sm">Tailored solutions for your business growth</p>

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition"
          onClick={() => handleServiceToggle(serviceId)}
        >
          {showDropdown === serviceId ? '🔽 Close Options' : '⚙️ Select Options'}
        </button>

        <AnimatePresence>
          {showDropdown === serviceId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3"
            >
              {servicesData[serviceId].subServices.map((subService) => (
                <label
                  key={subService.id}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices[serviceId]?.includes(subService.id) || false}
                    onChange={() => handleSubServiceSelect(serviceId, subService.id)}
                    className="h-5 w-5 accent-blue-500 focus:ring-blue-400"
                  />
                  <span className="text-gray-700 font-medium">{subService.name}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {selectedServices[serviceId]?.length > 0 && (
          <div className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-700 mb-1">🎯 Selected Services:</p>
            <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
              {selectedServices[serviceId].map((id) => (
                <li key={id}>{servicesData[serviceId].subServices.find((s) => s.id === id)?.name}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    ))}
  </div>
</section>


      <AnimatePresence>
        {Object.keys(selectedServices).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="max-w-7xl mx-auto p-6"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">ROI Analysis Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Traffic Growth</h3>
    <Line data={trafficGrowthData} options={trafficGrowthData.options} />
  </div>

  {isSeoSelected && (
    <>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Keyword Rankings</h3>
        <Line data={keywordRankingsData} options={keywordRankingsData.options} />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Backlinks Gained</h3>
        <Line data={backlinksData} options={backlinksData.options} />
      </div>
    </>
  )}

  {packageComparisonData.labels.length > 0 && (
    <div className="bg-white rounded-xl p-6 shadow-lg lg:col-span-2">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Package Comparison</h3>
      <Bar data={packageComparisonData} options={packageComparisonData.options} />
    </div>
  )}

  <div className="bg-white rounded-xl p-6 shadow-lg">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly ROI Projection</h3>
    <Line data={monthlyROIProjectionData} options={monthlyROIProjectionData.options} />
  </div>
</div>

          </motion.section>
        )}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Customize Your ROI Calculation</h2>
        <form onSubmit={handleFinalSubmit}>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'name', placeholder: 'Your Name', type: 'text' , required:true},
              { name: 'email', placeholder: 'Your Email', type: 'email' , required:true},
              { name: 'phone', placeholder: 'Phone Number', type: 'text' },
              { name: 'company', placeholder: 'Company Name', type: 'text' },
              { name: 'website', placeholder: 'Website URL', type: 'text' },
              { name: 'budget', placeholder: 'Budget ($)', type: 'number' },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required} 
                value={userInfo[field.name]}
                onChange={handleInputChange}
                className="bg-gray-100 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <select
              name="industry"
              value={userInfo.industry}
              onChange={handleInputChange}
              className="bg-gray-100 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              <option value="SaaS">SaaS</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Finance">Other</option>
            </select>
            <input
              type="number"
              name="saleValue"
              placeholder="Average Sale Value ($)"
              value={userInfo.saleValue}
              onChange={handleInputChange}
              className="bg-gray-100 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="conversionRate"
              placeholder="Current Website Conversion Rate (%)"
              value={userInfo.conversionRate}
              onChange={handleInputChange}
              className="bg-gray-100 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="monthlyTraffic"
              placeholder="Current Monthly Website Traffic"
              value={userInfo.monthlyTraffic}
              onChange={handleInputChange}
              className="bg-gray-100 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <motion.button
            type='submit'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Request
          </motion.button>
        </div>
        </form>
      </section>
    </div>
  );
};

export default NewAgency;