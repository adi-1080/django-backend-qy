import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, X, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const NavMain = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const getAllSearchableItems = () => {
    const items = [];

    topNavItems.forEach((navItem) => {
      items.push({ title: navItem.title, type: "section" });

      Object.entries(navItem.content.sections).forEach(
        ([sectionName, content]) => {
          if (sectionName === "Overview") {
            items.push({
              title: content.title,
              description: content.description,
              type: "overview",
            });
          } else {
            content.flat().forEach((item) => {
              items.push({
                title: item,
                section: navItem.title,
                subsection: sectionName,
                type: "item",
              });
            });
          }
        }
      );
    });

    return items;
  };

  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const searchableItems = getAllSearchableItems();
    const normalizedQuery = query.toLowerCase();

    const matchedItems = searchableItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          (item.description &&
            item.description.toLowerCase().includes(normalizedQuery))
      )
      .slice(0, 6); // Limit to 6 suggestions

    setSearchSuggestions(matchedItems);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMegaMenu(null);
        setActiveSubmenu(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const topNavItems = [
    {
      title: "Market",
      content: {
        mainNav: ["Company", "Leadership", "Culture", "History", "Locations"],
        sections: {
          Company: [
            ["About Us", "Mission", "Vision"],
            ["Our Values", "Commitment", "Global Impact"],
            ["Core Principles", "Ethics", "Sustainability"],
          ],
          Leadership: [
            ["Executive Team", "Board Members", "Regional Leaders"],
            ["Advisory Council", "Industry Experts", "Visionaries"],
          ],
          Culture: [
            ["Our Values", "Diversity & Inclusion", "Work-Life Balance"],
            ["Employee Stories", "Community Involvement", "Team Events"],
          ],
          History: [
            ["Our Journey", "Milestones", "Awards"],
            ["Key Achievements", "Major Projects", "Global Expansion"],
          ],
          Locations: [
            ["Global Offices", "Research Centers", "Innovation Hubs"],
            ["Regional Offices", "Satellite Locations", "Partnership Sites"],
          ],
        },
      },
    },
    {
      title: "Analytics",
      content: {
        mainNav: ["Research", "Blog", "Case Studies", "Reports", "Events"],
        sections: {
          Research: [
            ["Latest Research", "Industry Analysis", "Technology Trends"],
            ["Market Insights", "Consumer Behavior", "Emerging Markets"],
          ],
          Blog: [
            ["Thought Leadership", "Expert Opinions", "Success Stories"],
            ["Innovative Ideas", "Future Trends", "Tips & Tricks"],
          ],
          "Case Studies": [
            ["Customer Stories", "Solution Highlights", "Before & After"],
            ["Key Outcomes", "Challenges Solved", "Results Delivered"],
          ],
          Reports: [
            ["White Papers", "Market Analysis", "Technology Reviews"],
            ["Annual Reports", "Quarterly Insights", "Deep Dives"],
          ],
          Events: [
            ["Webinars", "Conferences", "Workshops"],
            ["Networking Events", "Keynote Speeches", "Panel Discussions"],
          ],
        },
      },
    },
    {
      title: "Supercharts",
      content: {
        mainNav: ["Vision 2025", "Strategy", "Innovation", "Growth", "Impact"],
        sections: {
          "Vision 2025": [
            [
              "Business Objectives",
              "Market Expansion",
              "Technology Leadership",
            ],
            ["Client Success", "Operational Excellence", "Global Reach"],
          ],
          Strategy: [
            ["Digital Transformation", "Sustainability", "Client Success"],
            ["Future Plans", "Partnerships", "Competitive Edge"],
          ],
          Innovation: [
            [
              "Research & Development",
              "Product Innovation",
              "Service Excellence",
            ],
            ["Creative Thinking", "Advanced Solutions", "Market Disruptors"],
          ],
          Growth: [
            ["Global Presence", "Market Share", "Revenue Growth"],
            ["Team Expansion", "New Initiatives", "Business Scalability"],
          ],
          Impact: [
            [
              "Social Responsibility",
              "Environmental Goals",
              "Community Initiatives",
            ],
            ["Philanthropy", "Volunteer Programs", "Positive Change"],
          ],
        },
      },
    },
  ];

  const isOverviewSection = (menu, submenu) => {
    return menu === "What we do" && submenu === 0;
  };

  const handleItemClick = (section,item) => {
    const formattedItem = item.toLowerCase().replace(/\s+/g, "-");
    navigate(`/industries/${formattedItem}`);
    setActiveMegaMenu(null);
    setActiveSubmenu(0);
    setIsMobileMenuOpen(false);
    setActiveMobileSubmenu(null);
  };

  const MobileMenuItem = ({ item }) => {
    const isActive = activeMobileSubmenu === item.title;
    const [activeSubSection, setActiveSubSection] = useState(null);

    return (
      <div className="border-b border-gray-800">
        <button
          onClick={() => setActiveMobileSubmenu(isActive ? null : item.title)}
          className="w-full py-4 px-4 flex justify-between items-center text-white hover:bg-gray-900"
        >
          <span className="text-lg">{item.title}</span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-200 ${
              isActive ? "rotate-180" : ""
            }`}
          />
        </button>

        {isActive && (
          <div className="bg-black">
            {item.content.mainNav.map((navItem, index) => {
              const sectionContent = item.content.sections[navItem];
              const isSubSectionActive = activeSubSection === navItem;

              return (
                <div key={index} className="border-t border-gray-800">
                  <button
                    onClick={() =>
                      setActiveSubSection(isSubSectionActive ? null : navItem)
                    }
                    className="w-full px-6 py-4 flex justify-between items-center text-gray-300 hover:text-white"
                  >
                    <span className="pr-2">{navItem}</span>
                    <ChevronRight
                      className={`h-5 w-5 flex-shrink-0 transform transition-transform duration-200 ${
                        isSubSectionActive ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isSubSectionActive && (
                    <div className="bg-[#DBE0E6]/20 px-4 py-4 overflow-x-hidden">
                      {navItem === "Overview" ? (
                        <div className="space-y-4">
                          <p className="text-gray-400 text-sm leading-relaxed break-words">
                            {sectionContent.description}
                          </p>
                          <button
                            onClick={() => handleItemClick(sectionContent.cta)}
                            className="text-white text-sm border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors"
                          >
                            {sectionContent.cta}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {sectionContent
                            ?.reduce((acc, curr) => acc.concat(curr), [])
                            .map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => handleItemClick(navItem ,subItem)}
                                className="block w-full text-left text-sm text-gray-400 hover:text-white py-1 break-words"
                              >
                                {subItem}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleSearchQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    generateSuggestions(newQuery);
    setSelectedSuggestionIndex(-1);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < searchSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        const selectedItem = searchSuggestions[selectedSuggestionIndex];
        handleSuggestionClick(selectedItem);
      } else {
        handleSearchSubmit(e);
      }
    }
  };

  const handleSuggestionClick = (item) => {
    if (item.type === "item") {
      handleItemClick(item.title);
    } else {
      navigate(`/search?q=${encodeURIComponent(item.title)}`);
    }
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchSuggestions([]);
  };

  const SearchOverlay = () => (
    <div className="absolute inset-0 bg-black bg-opacity-90 z-50">
      <div className="container mx-auto px-4 pt-16">
        <div className="relative max-w-3xl mx-auto">
          {/* Search header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white text-2xl">Search</h2>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchSuggestions([]);
              }}
              className="text-white hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              autoFocus ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search for anything..."
              className="w-full bg-white/10 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Search suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="mt-4 bg-white/5 rounded-lg overflow-hidden">
              {searchSuggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className={`w-full text-left px-4 py-3 transition-colors
                    ${
                      index === selectedSuggestionIndex
                        ? "bg-white/20 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      {item.type === "item" && (
                        <div className="text-sm text-gray-400">
                          {item.section} → {item.subsection}
                        </div>
                      )}
                      {item.type === "overview" && (
                        <div className="text-sm text-gray-400 truncate">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SearchButton = () => (
    <button
      onClick={() => setIsSearchOpen(true)}
      className="text-white hover:text-gray-300 p-2 lg:hidden"
    >
      <Search className="h-5 w-5" />
    </button>
  );

  return (
    <div className="bg-white px-20" ref={menuRef}>
      {/* Desktop Navigation */}
      <div className="relative">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 h-[72px]">
          {/* Search Icon (Mobile) */}
          <SearchButton />

          {/* Logo */}
          <div className="text-black brand-name text-2xl md:text-3xl mx-auto md:mx-0 md:mr-10 font-bold">
            Diamond-Rock
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-6 mr-auto">
            {topNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveMegaMenu(
                    activeMegaMenu === item.title ? null : item.title
                  );
                  setActiveSubmenu(0);
                }}
                className={`text-black text-[15.5px] hover:text-gray-700 flex items-center transition-colors duration-200 ${
                  activeMegaMenu === item.title
                    ? "text-gray-500 underline underline-offset-[9px] decoration-2"
                    : ""
                }`}
              >
                {item.title}
                <svg
                  className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                    activeMegaMenu === item.title ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Desktop Contact/Login */}
          <div className="hidden md:flex flex-row gap-10 text-sm">
            <Link
              to="../signup"
              className="text-gray-400 hover:underline font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              SIGNUP
            </Link>
            <Link
              to="../login"
              className="text-gray-400 hover:underline font-semibold hover:text-gray-300 transition-colors duration-200"
            >
              LOGIN
            </Link>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        {activeMegaMenu && (
          <div
            className="hidden md:block absolute w-full h-[430px] bg-white transition-all duration-300 ease-in-out"
            style={{ zIndex: 100 }}
          >
            <div className="flex">
              {/* Left Sidebar Navigation */}
              <div className="w-80 border-none m-8 ml-20">
                {topNavItems
                  .find((item) => item.title === activeMegaMenu)
                  .content.mainNav.map((navItem, index) => (
                    <Link
                      key={index}
                      to={`../${navItem.toLowerCase().replace(/\s+/g, '-')}`}
                      onMouseEnter={() => setActiveSubmenu(index)}
                      className={`w-full relative border-[#DBE0E6]/20 border-b-2 text-left py-5 text-black hover:bg-[#DBE0E6]/20 flex justify-between items-center transition-colors duration-200 ${
                        activeSubmenu === index ? "bg-[#DBE0E6]/20" : ""
                      }`}
                    >
                      <span>{navItem}</span>
                      <svg
                        className="h-7 w-7 text-gray-500 absolute right-[-9px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  ))}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-8 px-28 flex flex-col justify-start">
                {isOverviewSection(activeMegaMenu, activeSubmenu) ? (
                  <div className="max-w-3xl">
                    <h2 className="text-4xl text-black font-light mb-6">
                      {topNavItems[0].content.sections.Overview.title}
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                      {topNavItems[0].content.sections.Overview.description}
                    </p>
                    <button className="text-black border border-white rounded-full px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200">
                      {topNavItems[0].content.sections.Overview.cta}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-x-6">
                    {(() => {
                      const activeMenu = topNavItems.find(
                        (item) => item.title === activeMegaMenu
                      );
                      const activeNavItem =
                        activeMenu.content.mainNav[activeSubmenu];
                      const sectionContent =
                        activeMenu.content.sections[activeNavItem] || [];

                      const itemsPerColumn = Math.ceil(
                        sectionContent.flat().length / 3
                      );
                      const columns = Array.from({ length: 3 }, (_, i) =>
                        sectionContent
                          .flat()
                          .slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
                      );

                      return columns.map((columnItems, colIndex) => (
                        <div
                          key={colIndex}
                          className="flex-1 flex flex-col gap-y-8"
                        >
                          {columnItems.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => handleItemClick(activeNavItem,item)}
                              className="text-gray-400 hover:text-black cursor-pointer transition-colors duration-200"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Add search overlay */}
      {isSearchOpen && <SearchOverlay />}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 w-screen bg-black transform transition-transform duration-300 ${
          isMobileMenuOpen ? "-translate-x-0" : "translate-x-full"
        }
        ${isSearchOpen ? "hidden" : ""}  
        md:hidden`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div className="text-black text-2xl">Quickyearning.</div>
            <button
              className="text-black p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 max-w-full">
            {topNavItems.map((item, index) => (
              <MobileMenuItem key={index} item={item} />
            ))}

            <div className="p-6 space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 text-gray-600 font-semibold hover:text-gray-300 transition-colors duration-200"
              >
                CONTACT US
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 text-gray-600 font-semibold hover:text-gray-300 transition-colors duration-200"
              >
                LOGIN | SIGNUP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMain;
