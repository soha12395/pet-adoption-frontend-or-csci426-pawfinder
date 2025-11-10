import React from 'react'
import { Users, Award, TrendingUp, Target, Heart, Shield, UsersRound, ArrowRight } from "lucide-react";
import  '../styles/About.css';

const About = () => {
  const stats = [
    { icon: Users, label: "Pets Adopted", value: "2,500+" },
    { icon: Award, label: "Years of Service", value: "15+" },
    { icon: TrendingUp, label: "Success Rate", value: "98%" },
    { icon: Target, label: "Partner Shelters", value: "50+" },
  ];

  const values = [
    {
      title: "Compassion",
      description: "We treat every animal with love, kindness, and respect, ensuring they receive the care they deserve."
    },
    {
      title: "Commitment",
      description: "We're dedicated to finding the perfect match for each pet and providing lifelong support to adopting families."
    },
    {
      title: "Community",
      description: "We work together with our community to promote responsible pet ownership and animal welfare."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Rescue & Assessment",
      description: "We rescue pets from shelters and conduct thorough health and behavioral assessments to understand their needs."
    },
    {
      number: "2",
      title: "Medical Care & Training",
      description: "All pets receive necessary medical treatment, vaccinations, and basic training to prepare them for their new homes."
    },
    {
      number: "3",
      title: "Matching & Adoption",
      description: "We carefully match pets with families based on lifestyle, experience, and preferences to ensure successful adoptions."
    },
    {
      number: "4",
      title: "Post-Adoption Support",
      description: "We provide ongoing support and resources to help families and pets adjust to their new life together."
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Paws of Beirut</h1>
          <p className="about-hero-tagline">
            We're dedicated to connecting loving families with pets in need, creating lasting bonds and happy endings.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Mission</h2>
          <div className="about-mission-content">
            <p className="about-text">
              At Paws of Beirut, our mission is to rescue, rehabilitate, and rehome abandoned and neglected pets. We believe every pet deserves a loving home and a second chance at happiness. Through our comprehensive adoption program, we carefully match pets with families to ensure the best possible outcomes for both.
            </p>
            <p className="about-text">
              We work closely with local shelters, veterinarians, and volunteers to provide the highest level of care for our animals. Each pet receives medical attention, behavioral assessment, and lots of love before being placed in their forever home.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Impact</h2>
          <div className="about-stats-grid">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="about-stat-card">
                  <IconComponent className="about-stat-icon" />
                  <div className="about-stat-value">{stat.value}</div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-section-title">Our Values</h2>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <div key={index} className="about-value-card">
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-text">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-section-title">How We Work</h2>
          <div className="about-steps">
            {steps.map((step, index) => (
              <div key={index} className="about-step-card">
                <div className="about-step-number">{step.number}</div>
                <div className="about-step-content">
                  <h3 className="about-step-title">{step.title}</h3>
                  <p className="about-step-text">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

