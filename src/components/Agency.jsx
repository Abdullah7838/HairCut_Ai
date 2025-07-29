import React, { useState } from "react";
import {
  ChevronRight,
  Globe,
  Search,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Target,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Agency = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [websiteAnalysis, setWebsiteAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const services = {
    seo: {
      title: "SEO Services",
      icon: <Search className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      subServices: [
        { id: "on-page", name: "On-Page SEO", description: "Optimize content" },
        {
          id: "off-page",
          name: "Off-Page SEO",
          description: "Build authority",
        },
        {
          id: "technical",
          name: "Technical SEO",
          description: "Improve speed",
        },
        { id: "local", name: "Local SEO", description: "Local search" },
        {
          id: "ecommerce",
          name: "E-commerce SEO",
          description: "Product pages",
        },
      ],
    },
    webdev: {
      title: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      subServices: [
        {
          id: "custom",
          name: "Custom Website",
          description: "Custom solutions",
        },
        { id: "wordpress", name: "WordPress", description: "WordPress sites" },
        { id: "ecommerce", name: "E-commerce", description: "Online stores" },
        {
          id: "landing",
          name: "Landing Pages",
          description: "Converting pages",
        },
        { id: "mobile", name: "Mobile Apps", description: "iOS & Android" },
      ],
    },
    marketing: {
      title: "Digital Marketing",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      subServices: [
        { id: "google-ads", name: "Google Ads", description: "PPC campaigns" },
        { id: "facebook-ads", name: "Facebook Ads", description: "Social ads" },
        {
          id: "instagram-ads",
          name: "Instagram Ads",
          description: "Visual ads",
        },
        {
          id: "linkedin-ads",
          name: "LinkedIn Ads",
          description: "B2B targeting",
        },
        { id: "youtube-ads", name: "YouTube Ads", description: "Video ads" },
      ],
    },
    social: {
      title: "Social Media",
      icon: <Users className="w-6 h-6" />,
      color: "from-pink-500 to-pink-600",
      subServices: [
        {
          id: "content",
          name: "Content Creation",
          description: "Engaging posts",
        },
        {
          id: "community",
          name: "Community",
          description: "Audience engagement",
        },
        {
          id: "influencer",
          name: "Influencer",
          description: "Influencer partnerships",
        },
        { id: "strategy", name: "Strategy", description: "Social plans" },
        {
          id: "analytics",
          name: "Analytics",
          description: "Track performance",
        },
      ],
    },
    content: {
      title: "Content Marketing",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      subServices: [
        { id: "blog", name: "Blog Writing", description: "SEO articles" },
        { id: "copywriting", name: "Copywriting", description: "Sales copy" },
        { id: "video", name: "Video Content", description: "Video production" },
        {
          id: "infographics",
          name: "Infographics",
          description: "Visual design",
        },
        { id: "email", name: "Email Marketing", description: "Newsletters" },
      ],
    },
  };

  const getFormFields = (serviceId) => {
    const baseFields = [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "company", label: "Company Name", type: "text", required: false },
      { name: "website", label: "Website URL", type: "url", required: false },
      { name: "budget", label: "Budget ($)", type: "number", required: true },
    ];

    if (serviceId === "seo") {
      return [
        ...baseFields,
        {
          name: "monthlyVisitors",
          label: "Monthly Visitors",
          type: "number",
          required: true,
        },
        {
          name: "keywords",
          label: "Target Keywords (comma separated)",
          type: "textarea",
          required: false,
        },
        {
          name: "competitors",
          label: "Competitor URLs (comma separated)",
          type: "textarea",
          required: false,
        },
      ];
    } else if (serviceId === "webdev") {
      return [
        ...baseFields,
        {
          name: "projectType",
          label: "Project Type",
          type: "select",
          options: ["New Website", "Redesign", "Additional Features"],
          required: true,
        },
        {
          name: "timeline",
          label: "Timeline",
          type: "select",
          options: ["1-2 weeks", "2-4 weeks", "1-2 months"],
          required: true,
        },
        {
          name: "features",
          label: "Features",
          type: "textarea",
          required: true,
        },
      ];
    } else if (serviceId === "marketing") {
      return [
        ...baseFields,
        {
          name: "targetAudience",
          label: "Target Audience",
          type: "textarea",
          required: true,
        },
        {
          name: "adSpend",
          label: "Current Ad Spend ($)",
          type: "number",
          required: true,
        },
      ];
    } else {
      return [
        ...baseFields,
        {
          name: "projectDetails",
          label: "Project Details",
          type: "textarea",
          required: true,
        },
      ];
    }
  };

  const analyzeWebsite = async (
    url,
    competitors,
    keywords,
    monthlyVisitors,
    budget
  ) => {
    console.log("Starting website analysis with:", { url, competitors, keywords, monthlyVisitors, budget });
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second loading
    try {
      // Simulate API response instead of calling a non-existent endpoint
      const response = {
        data: {
          title: "Mock Website Analysis",
          backlinks: 150,
          pageSpeed: 65,
        },
      };
      const competitorResponses = (competitors || "")
        .split(",")
        .filter((url) => url.trim())
        .map((_, i) => ({
          data: {
            traffic: 120000 + i * 60000,
            keywords: 600 + i * 150,
          },
        }));

      const analysis = {
        url,
        title: response.data.title || "Website Analysis",
        currentMetrics: {
          performance: "20 to 45%",
          traffic: parseInt(monthlyVisitors) || 1000,
          keywords: (keywords || "").split(",").length || 1,
          backlinks: response.data.backlinks || 100,
          pageSpeed: response.data.pageSpeed || 60,
        },
        competitors: competitorResponses.map((res, i) => ({
          name: `Competitor ${i + 1}`,
          url: (competitors || "").split(",")[i]?.trim() || `competitor${i + 1}.com`,
          traffic: res.data.traffic || 100000 + i * 50000,
          keywords: res.data.keywords || 500 + i * 100,
        })),
        improvements: {
          month1: {
            traffic: "+25%",
            keywords: `+${Math.round(((keywords || "").split(",").length || 1) * 0.3)} keywords`,
            backlinks: "+50%",
            pageSpeed: "+10 points",
            actions: [
              "Technical audit",
              "On-page optimization",
              "Content strategy",
            ],
          },
          month2: {
            traffic: "+50%",
            keywords: `+${Math.round(((keywords || "").split(",").length || 1) * 0.6)} keywords`,
            backlinks: "+100%",
            pageSpeed: "+20 points",
            actions: ["Link building", "Content creation", "Local SEO"],
          },
          month3: {
            traffic: "+100%",
            keywords: `+${Math.round(((keywords || "").split(",").length || 1))} keywords`,
            backlinks: "+200%",
            pageSpeed: "+30 points",
            actions: [
              "Advanced link building",
              "Competitor analysis",
              "Monitoring",
            ],
          },
        },
        budget,
      };

      if (selectedService === "webdev") {
        analysis.improvements = {
          month1: {
            features: "Core functionality complete",
            performance: "+20% load time",
            actions: ["Initial development", "UI/UX design", "Testing"],
          },
          month2: {
            features: "Advanced features added",
            performance: "+40% load time",
            actions: ["Feature implementation", "Optimization", "User testing"],
          },
          month3: {
            features: "All features live",
            performance: "+60% load time",
            actions: ["Final testing", "Launch", "Maintenance setup"],
          },
        };
      } else if (
        selectedService === "marketing" ||
        selectedService === "social" ||
        selectedService === "content"
      ) {
        analysis.improvements = {
          month1: {
            engagement: "+20% engagement",
            reach: "+25% audience",
            actions: [
              "Strategy development",
              "Content creation",
              "Initial campaigns",
            ],
          },
          month2: {
            engagement: "+40% engagement",
            reach: "+50% audience",
            actions: [
              "Campaign optimization",
              "Audience targeting",
              "Analytics setup",
            ],
          },
          month3: {
            engagement: "+60% engagement",
            reach: "+100% audience",
            actions: ["Advanced campaigns", "Performance analysis", "Scaling"],
          },
        };
      }

      setWebsiteAnalysis(analysis);
    } catch (error) {
      console.error("Analysis failed:", error);
      const analysis = {
        url,
        title: "Website Analysis",
        currentMetrics: {
          performance: "20 to 45%",
          traffic: parseInt(monthlyVisitors) || 1000,
          keywords: (keywords || "").split(",").length || 1,
          backlinks: 100,
          pageSpeed: 60,
        },
        competitors: (competitors || "")
          .split(",")
          .filter((url) => url.trim())
          .map((url, i) => ({
            name: `Competitor ${i + 1}`,
            url: url.trim() || `competitor${i + 1}.com`,
            traffic: 100000 + i * 50000,
            keywords: 500 + i * 100,
          })),
        improvements:
          selectedService === "seo"
            ? {
                month1: {
                  traffic: "+25%",
                  keywords: "+50 keywords",
                  backlinks: "+50%",
                  pageSpeed: "+10 points",
                  actions: ["Technical audit", "On-page optimization"],
                },
                month2: {
                  traffic: "+50%",
                  keywords: "+100 keywords",
                  backlinks: "+100%",
                  pageSpeed: "+20 points",
                  actions: ["Link building", "Content creation"],
                },
                month3: {
                  traffic: "+100%",
                  keywords: "+200 keywords",
                  backlinks: "+200%",
                  pageSpeed: "+30 points",
                  actions: ["Advanced link building", "Monitoring"],
                },
              }
            : selectedService === "webdev"
            ? {
                month1: {
                  features: "Core functionality",
                  performance: "+20% load time",
                  actions: ["Initial development", "UI/UX design"],
                },
                month2: {
                  features: "Advanced features",
                  performance: "+40% load time",
                  actions: ["Feature implementation", "Optimization"],
                },
                month3: {
                  features: "All features live",
                  performance: "+60% load time",
                  actions: ["Final testing", "Launch"],
                },
              }
            : {
                month1: {
                  engagement: "+20% engagement",
                  reach: "+25% audience",
                  actions: ["Strategy development", "Content creation"],
                },
                month2: {
                  engagement: "+40% engagement",
                  reach: "+50% audience",
                  actions: ["Campaign optimization", "Audience targeting"],
                },
                month3: {
                  engagement: "+60% engagement",
                  reach: "+100% audience",
                  actions: ["Advanced campaigns", "Performance analysis"],
                },
              },
        budget,
      };
      setWebsiteAnalysis(analysis);
    }
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with userInfo:", userInfo);
    const fields = getFormFields(selectedService);
    const missingFields = fields
      .filter((field) => field.required && !userInfo[field.name])
      .map((field) => field.label);
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      return;
    }
    try {
      if (selectedService === "seo") {
        await analyzeWebsite(
          userInfo.website || "",
          userInfo.competitors || "",
          userInfo.keywords || "",
          userInfo.monthlyVisitors || "",
          userInfo.budget || ""
        );
      } else {
        setIsAnalyzing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setWebsiteAnalysis({
          url: userInfo.website || "",
          title: "Project Analysis",
          currentMetrics: {
            performance: userInfo.website ? "20 to 45%" : null,
            traffic: parseInt(userInfo.monthlyVisitors) || 1000,
          },
          improvements:
            selectedService === "webdev"
              ? {
                  month1: {
                    features: "Core functionality",
                    performance: "+20% load time",
                    actions: ["Initial development", "UI/UX design"],
                  },
                  month2: {
                    features: "Advanced features",
                    performance: "+40% load time",
                    actions: ["Feature implementation", "Optimization"],
                  },
                  month3: {
                    features: "All features live",
                    performance: "+60% load time",
                    actions: ["Final testing", "Launch"],
                  },
                }
              : {
                  month1: {
                    engagement: "+20% engagement",
                    reach: "+25% audience",
                    actions: ["Strategy development", "Content creation"],
                  },
                  month2: {
                    engagement: "+40% engagement",
                    reach: "+50% audience",
                    actions: ["Campaign optimization", "Audience targeting"],
                  },
                  month3: {
                    engagement: "+60% engagement",
                    reach: "+100% audience",
                    actions: ["Advanced campaigns", "Performance analysis"],
                  },
                },
          budget: userInfo.budget || "",
        });
        setIsAnalyzing(false);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setIsAnalyzing(false);
    }
  };

  const handleFinalSubmit = () => {
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

--- Selected Service ---
Service: ${services[selectedService]?.title || "N/A"}
Package: ${
      services[selectedService]?.subServices.find(
        (s) => s.id === selectedSubService
      )?.name || "N/A"
    }

Timestamp: ${new Date().toLocaleString()}

Thank you!
  `);

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=needhelpvcc@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailURL, "_blank");
  };

  const handleInputChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const renderServiceCard = (serviceKey, service) => (
    <motion.div
      key={serviceKey}
      onClick={() => setSelectedService(serviceKey)}
      className={`bg-gradient-to-r ${service.color} p-6 rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="p-3 bg-white/30 rounded-full"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {service.icon}
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
          <p className="text-white/90 text-sm">Professional services for you</p>
        </div>
        <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
          <ChevronRight className="w-6 h-6 ml-auto text-white" />
        </motion.div>
      </div>
    </motion.div>
  );

  const renderSubServiceSelection = () => {
    const service = services[selectedService];
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <motion.button
          onClick={() => setSelectedService(null)}
          className="mb-8 text-blue-600 hover:text-blue-800 flex items-center font-medium text-lg transition-colors duration-300"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Services
        </motion.button>
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 tracking-tight">
          Choose Your {service.title} Package
        </h2>
        <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
          {service.subServices.map((subService) => (
            <motion.div
              key={subService.id}
              onClick={() => setSelectedSubService(subService.id)}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer border-2 border-gray-100 hover:border-blue-300 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mb-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {subService.name}
              </h3>
              <p className="text-gray-600 text-sm">{subService.description}</p>
              <motion.div
                className="mt-4 flex items-center text-blue-600"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-semibold">Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderForm = () => {
    const fields = getFormFields(selectedService);
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <motion.button
          onClick={() => setSelectedSubService(null)}
          className="mb-8 text-blue-600 hover:text-blue-800 flex items-center font-medium text-lg transition-colors duration-300"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Packages
        </motion.button>
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">
            Project Details
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {fields.map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={4}
                    required={field.required}
                    value={userInfo[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    value={userInfo[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    value={userInfo[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </motion.div>
            ))}
            <motion.button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Get Analysis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  const renderResults = () => {
    if (!showResults) return null;

    const trafficData = {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Traffic Rate",
          data:
            selectedService === "seo"
              ? [100000, 250000, 400000]
              : [10000, 25000, 40000],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    const keywordData = selectedService === "seo" && {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "After Our SEO Your Keywords",
          data: [
            websiteAnalysis.currentMetrics.keywords * 1000,
            websiteAnalysis.currentMetrics.keywords * 2000,
            websiteAnalysis.currentMetrics.keywords * 5000,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const backlinkData = selectedService === "seo" && {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Backlinks",
          data: [
            websiteAnalysis.currentMetrics.backlinks * 2,
            websiteAnalysis.currentMetrics.backlinks * 3,
            websiteAnalysis.currentMetrics.backlinks * 4,
          ],
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };

    const pageSpeedData = selectedService === "seo" && {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Page Speed Score",
          data: [
            websiteAnalysis.currentMetrics.pageSpeed + 30,
            websiteAnalysis.currentMetrics.pageSpeed + 40,
            websiteAnalysis.currentMetrics.pageSpeed + 40,
          ],
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };

    const performanceData = selectedService === "webdev" && {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Performance Score",
          data: [85, 90, 99],
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };

    const engagementData = (selectedService === "marketing" ||
      selectedService === "social" ||
      selectedService === "content") && {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Engagement Rate",
          data: [2000, 5000, 10000],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mt-12"
      >
        <motion.div
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-2xl shadow-2xl mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-4xl font-extrabold mb-2">Analysis Complete!</h2>
            <p className="text-xl opacity-90">Your project analysis</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
              Current Performance
            </h3>
            {(selectedService === "seo" || websiteAnalysis.url) && (
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-extrabold text-blue-600">
                  20 to 35%
                </div>
                <div className="text-gray-600 text-sm">Current Performance</div>
              </div>
            )}
          </motion.div>

          {selectedService === "seo" && websiteAnalysis.competitors && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
                Competitor Analysis
              </h3>
              <div className="space-y-4">
                {websiteAnalysis.competitors.map((competitor, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl flex-col sm:flex-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {competitor.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {competitor.url}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">
                        {competitor.traffic.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {competitor.keywords} keywords
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
              Projected Improvements
            </h3>
            <div className="grid md:grid-cols-2 gap-8 sm:grid-cols-1">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-900">
                  {selectedService === "seo"
                    ? "Traffic Growth"
                    : selectedService === "webdev"
                    ? "Web Performance"
                    : "Engagement Growth"}
                </h4>
                <Bar
                  data={trafficData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: "top" } },
                    animation: {
                      duration: 1000,
                      easing: "easeOutCubic",
                    },
                  }}
                />
              </div>
              {selectedService === "seo" && keywordData && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Keyword Growth
                  </h4>
                  <Bar
                    data={keywordData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" } },
                      animation: {
                        duration: 1000,
                        easing: "easeOutCubic",
                      },
                    }}
                  />
                </div>
              )}
              {selectedService === "seo" && backlinkData && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Backlink Growth
                  </h4>
                  <Bar
                    data={backlinkData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" } },
                      animation: {
                        duration: 1000,
                        easing: "easeOutCubic",
                      },
                    }}
                  />
                </div>
              )}
              {selectedService === "seo" && pageSpeedData && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Page Speed Improvement
                  </h4>
                  <Bar
                    data={pageSpeedData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" } },
                      animation: {
                        duration: 1000,
                        easing: "easeOutCubic",
                      },
                    }}
                  />
                </div>
              )}
              {selectedService === "webdev" && performanceData && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">
                    Performance Improvement
                  </h4>
                  <Bar
                    data={performanceData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" } },
                      animation: {
                        duration: 1000,
                        easing: "easeOutCubic",
                      },
                    }}
                  />
                </div>
              )}
              {(selectedService === "marketing" ||
                selectedService === "social" ||
                selectedService === "content") &&
                engagementData && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-900">
                      Engagement Growth
                    </h4>
                    <Bar
                      data={engagementData}
                      options={{
                        responsive: true,
                        plugins: { legend: { position: "top" } },
                        animation: {
                          duration: 1000,
                          easing: "easeOutCubic",
                        },
                      }}
                    />
                  </div>
                )}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 border-b pb-4">
              📝 Project Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Service</span>
                <span className="text-gray-900">
                  {services[selectedService]?.title || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Package</span>
                <span className="text-gray-900">
                  {
                    services[selectedService]?.subServices.find(
                      (s) => s.id === selectedSubService
                    )?.name || "N/A"
                  }
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Client</span>
                <span className="text-gray-900">{userInfo.name || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Email</span>
                <span className="text-gray-900">{userInfo.email || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Phone</span>
                <span className="text-gray-900">{userInfo.phone || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Company</span>
                <span className="text-gray-900">
                  {userInfo.company || "Individual"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Website</span>
                <span className="text-blue-600 underline break-words">
                  {userInfo.website || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">Budget</span>
                <span className="text-gray-900">${userInfo.budget || "N/A"}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Proceed?</h3>
            <p className="text-xl mb-6">Submit to start your project!</p>
            <motion.button
              onClick={handleFinalSubmit}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Project
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence>
          {!selectedService && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-16">
                <motion.h1
                  className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  Grow Your Business with
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    Cubix SEO
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Comprehensive digital solutions to help your business thrive
                  online.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Free Consultation
                  </motion.button>
                  <motion.button
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Our Work
                  </motion.button>
                </motion.div>
              </div>
              <div>
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
                  Choose Your Service
                </h2>
                <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
                  {Object.entries(services).map(([key, service], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {renderServiceCard(key, service)}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mt-20 grid md:grid-cols-3 gap-8 sm:grid-cols-2 grid-cols-1">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Targeted Results
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Data-driven strategies for growth.
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Expert Team
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Dedicated professionals for success.
                  </p>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Proven Track Record
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Hundreds of successful projects.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
          {selectedService && !selectedSubService && (
            <motion.div
              key="subservices"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderSubServiceSelection()}
            </motion.div>
          )}
          {selectedService && selectedSubService && !showResults && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderForm()}
            </motion.div>
          )}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderResults()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Agency;