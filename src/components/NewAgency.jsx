import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";

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
    title: "SEO Services",
    subServices: [
      { id: "local-seo", name: "Local SEO" },
      { id: "on-page-seo", name: "On-Page SEO" },
      { id: "off-page-seo", name: "Off-Page SEO" },
      { id: "technical-seo", name: "Technical SEO" },
    ],
  },
  webDev: {
    title: "Web Development",
    subServices: [
      { id: "frontend", name: "Frontend Development" },
      { id: "backend", name: "Backend Development" },
      { id: "full-stack", name: "Full Stack Development" },
    ],
  },
  digitalMarketing: {
    title: "Digital Marketing",
    subServices: [
      { id: "ppc", name: "PPC Advertising" },
      { id: "email", name: "Email Marketing" },
      { id: "content", name: "Content Strategy" },
    ],
  },
  socialMedia: {
    title: "Social Media",
    subServices: [
      { id: "smm", name: "Social Media Management" },
      { id: "ads", name: "Social Media Ads" },
      { id: "influencer", name: "Influencer Marketing" },
    ],
  },
  contentMarketing: {
    title: "Content Marketing",
    subServices: [
      { id: "blog", name: "Blog Content" },
      { id: "video", name: "Video Content" },
      { id: "infographic", name: "Infographics" },
    ],
  },
};

const NewAgency = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "",
    industry: "",
    saleValue: "",
    conversionRate: "",
    monthlyTraffic: "",
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
        const subServiceNames = subServiceIds.map(
          (id) => service.subServices.find((s) => s.id === id)?.name
        );
        return `Service: ${service.title}\nPackages: ${subServiceNames.join(
          ", "
        )}`;
      })
      .join("\n\n");

    const subject = encodeURIComponent("New Service Request Summary");
    const body = encodeURIComponent(`
Hi CubixSEO Team,

--- Client Info ---
Name: ${userInfo.name || "N/A"}
Email: ${userInfo.email || "N/A"}
Phone: ${userInfo.phone || "N/A"}
Company: ${userInfo.company || "Individual"}
Website: ${userInfo.website || "N/A"}
Budget: $${userInfo.budget || "N/A"}

--- Selected Services ---
${selectedServiceDetails || "No services selected"}

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
      "_blank"
    );
  };

  const isSeoSelected = selectedServices["seo"]?.length > 0;
  const labels = ["1st Month", "2nd Month", "3rd Month"];

  const trafficGrowthData = {
    labels,
    datasets: [
      {
        label: "Website Traffic",
        data: [1200, 3400, 7500],
        fill: false,
        borderColor: "#4F46E5",
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
        label: "Keywords in Top 10",
        data: [10, 35, 60],
        fill: false,
        borderColor: "#10B981",
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
        label: "Backlinks Acquired",
        data: [15, 50, 130],
        fill: false,
        borderColor: "#F59E0B",
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
        label: "Estimated ROI ($)",
        data: [300, 1100, 2500],
        fill: false,
        borderColor: "#EF4444",
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
    labels: ["Starter", "Enterprise", "Pro"],
    datasets: [
      {
        label: "Keywords Rank Increase",
        backgroundColor: ["#60A5FA", "#34D399", "#FBBF24"],
        data: [30, 60, 100],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans w-[1000px] mx-auto">
      <motion.header
        className="text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-b-3xl shadow-xl"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl font-extrabold mb-4"
        >
          Cubix SEO Agency
        </motion.h1>
        <motion.p
          className="text-xl mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Transform Your Business with Expert Digital Solutions
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-2 bg-yellow-400 mx-auto rounded-full"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.header>

      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Our Plans
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {/* Starter Package */}
          <motion.div
            className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all bg-white"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Starter
            </h3>
            <p className="text-gray-500 mb-6">
              Perfect for small businesses starting SEO efforts.
            </p>
            <div className="text-4xl font-bold text-indigo-600 mb-6">
              $199
              <span className="text-base font-medium text-gray-500">/mo</span>
            </div>
            <ul className="space-y-4 text-gray-700 text-sm mb-6">
              <li>✅ 5 Keywords Tracked</li>
              <li>✅ Monthly Report</li>
              <li>✅ Basic On-Page Optimization</li>
              <li>❌ Backlink Building</li>
              <li>❌ Blog Content</li>
            </ul>
            <motion.button
            onClick={() => {
    const el = document.getElementById('my-target-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-3 rounded-lg font-medium"
            >
              Choose Plan
            </motion.button>
          </motion.div>

          {/* Professional Package */}
          <motion.div
            className="border-2 border-indigo-600 rounded-xl p-8 shadow-2xl bg-white relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Professional
            </h3>
            <p className="text-gray-500 mb-6">
              For growing businesses focused on real SEO results.
            </p>
            <div className="text-4xl font-bold text-indigo-600 mb-6">
              $499
              <span className="text-base font-medium text-gray-500">/mo</span>
            </div>
            <ul className="space-y-4 text-gray-700 text-sm mb-6">
              <li>✅ 20 Keywords Tracked</li>
              <li>✅ Bi-Weekly Report</li>
              <li>✅ On & Off-Page Optimization</li>
              <li>✅ Backlink Building (5/month)</li>
              <li>✅ 2 SEO Blog Posts</li>
            </ul>
            <motion.button
            onClick={() => {
    const el = document.getElementById('my-target-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-lg"
            >
              Choose Plan
            </motion.button>
          </motion.div>

          {/* Enterprise Package */}
          <motion.div
            className="border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all bg-white"
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Enterprise
            </h3>
            <p className="text-gray-500 mb-6">
              Custom strategies for high-growth and enterprise clients.
            </p>
            <div className="text-4xl font-bold text-indigo-600 mb-6">
              Custom
            </div>
            <ul className="space-y-4 text-gray-700 text-sm mb-6">
              <li>✅ Unlimited Keywords</li>
              <li>✅ Dedicated SEO Manager</li>
              <li>✅ Weekly Strategy Calls</li>
              <li>✅ Unlimited Backlinks</li>
              <li>✅ Custom Content Creation</li>
            </ul>
            <motion.button
            onClick={() => {
    const el = document.getElementById('my-target-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium"
            >
              Choose Plan
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="my-target-section"
        className="py-16 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-12 text-center text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          🚀 Select Your Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(servicesData).map((serviceId) => (
            <motion.div
              key={serviceId}
              className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 2.2 + Object.keys(servicesData).indexOf(serviceId) * 0.1,
              }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />

              <h3 className="text-2xl font-bold text-indigo-600 mb-2 mt-2">
                {servicesData[serviceId].title}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                Tailored solutions for your business growth
              </p>

              <motion.button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition"
                onClick={() => handleServiceToggle(serviceId)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {showDropdown === serviceId
                  ? "🔽 Close Options"
                  : "⚙️ Select Options"}
              </motion.button>

              <AnimatePresence>
                {showDropdown === serviceId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3"
                  >
                    {servicesData[serviceId].subServices.map((subService) => (
                      <motion.label
                        key={subService.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedServices[serviceId]?.includes(
                              subService.id
                            ) || false
                          }
                          onChange={() =>
                            handleSubServiceSelect(serviceId, subService.id)
                          }
                          className="h-5 w-5 accent-blue-500 focus:ring-blue-400"
                        />
                        <span className="text-gray-700 font-medium">
                          {subService.name}
                        </span>
                      </motion.label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {selectedServices[serviceId]?.length > 0 && (
                <motion.div
                  className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm font-semibold text-indigo-700 mb-1">
                    🎯 Selected Services:
                  </p>
                  <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
                    {selectedServices[serviceId].map((id) => (
                      <motion.li
                        key={id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {
                          servicesData[serviceId].subServices.find(
                            (s) => s.id === id
                          )?.name
                        }
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {Object.keys(selectedServices).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="p-8"
          >
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ROI Analysis Dashboard
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Traffic Growth
                </h3>
                <Line
                  data={trafficGrowthData}
                  options={trafficGrowthData.options}
                />
              </motion.div>

              {isSeoSelected && (
                <>
                  <motion.div
                    className="bg-white rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      Keyword Rankings
                    </h3>
                    <Line
                      data={keywordRankingsData}
                      options={keywordRankingsData.options}
                    />
                  </motion.div>
                  <motion.div
                    className="bg-white rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">
                      Backlinks Gained
                    </h3>
                    <Line
                      data={backlinksData}
                      options={backlinksData.options}
                    />
                  </motion.div>
                </>
              )}

              {packageComparisonData.labels.length > 0 && (
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg lg:col-span-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Package Comparison
                  </h3>
                  <Bar
                    data={packageComparisonData}
                    options={packageComparisonData.options}
                  />
                </motion.div>
              )}

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Monthly ROI Projection
                </h3>
                <Line
                  data={monthlyROIProjectionData}
                  options={monthlyROIProjectionData.options}
                />
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.section
        className="p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          Customize Your ROI Calculation
        </motion.h2>

        <form onSubmit={handleFinalSubmit}>
          <motion.div
            className="bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8 }}
          >
            <motion.h3
              className="text-xl font-semibold mb-6 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              Business Information
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "name",
                  placeholder: "Your Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "email",
                  placeholder: "Your Email",
                  type: "email",
                  required: true,
                },
                { name: "phone", placeholder: "Phone Number", type: "text" },
                { name: "company", placeholder: "Company Name", type: "text" },
                { name: "website", placeholder: "Website URL", type: "text" },
                { name: "budget", placeholder: "Budget ($)", type: "number" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 + index * 0.1 }}
                >
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={userInfo[field.name]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6 }}
              >
                <select
                  name="industry"
                  value={userInfo.industry}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Industry</option>
                  <option value="SaaS">SaaS</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.7 }}
              >
                <input
                  type="number"
                  name="saleValue"
                  placeholder="Average Sale Value ($)"
                  value={userInfo.saleValue}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.8 }}
              >
                <input
                  type="number"
                  name="conversionRate"
                  placeholder="Current Website Conversion Rate (%)"
                  value={userInfo.conversionRate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.9 }}
              >
                <input
                  type="number"
                  name="monthlyTraffic"
                  placeholder="Current Monthly Website Traffic"
                  value={userInfo.monthlyTraffic}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 p-4 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
            >
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-lg"
              >
                Submit Request
              </motion.button>
            </motion.div>
          </motion.div>
        </form>
      </motion.section>

      {/* <motion.footer
        className="py-8 bg-gray-800 text-white text-center rounded-t-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
      >
        <motion.p
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          © {new Date().getFullYear()} Cubix SEO Agency. All rights reserved.
        </motion.p>
      </motion.footer> */}
    </div>
  );
};

export default NewAgency;
