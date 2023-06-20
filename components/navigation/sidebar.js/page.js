"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { BsListNested } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { BsFillFilePersonFill } from "react-icons/bs";
import { BsListTask } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="sidebar_container">
      <div style={{ width: isOpen ? "270px" : "70px" }} className="sidebar">
        <div className="top_section  mb-4 mt-2">
          <div style={{ display: isOpen ? "block" : "none" }} className="logo">
            Admin Dashboard
          </div>
          <hr />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <Link
          className="link"
          // activeclassName="active"
          href="/dashboard"
        >
          <div className="icon">
            <RiDashboardLine size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Dashboard
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/termtype"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Term Type
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/company"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Organization
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/contractor"
        >
          <div className="icon">
            <BsFillFilePersonFill size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contractor
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/obligation"
        >
          <div className="icon">
            <BsListNested size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Obligation/Clause
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/term"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Term
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/signature"
        >
          <div className="icon">
            <BsListTask size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contract Signature
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/contract"
        >
          <div className="icon">
            <FaFileContract size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Contract
          </div>
        </Link>
        <Link
          className="link"
          // activeclassName="active"
          href="/compliance"
        >
          <div className="icon">
            <GrCompliance size={20} />
          </div>
          <div
            className="link_text"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Compliance Verification
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
