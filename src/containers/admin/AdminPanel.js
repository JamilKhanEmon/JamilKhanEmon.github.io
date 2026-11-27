import React, {useContext, useEffect, useState} from "react";
import StyleContext from "../../contexts/StyleContext";
import {usePortfolio} from "../../contexts/PortfolioContext";
import AdminMascot from "../../components/adminMascot/AdminMascot";
import {
  savePortfolioData,
  supabase,
  uploadPortfolioAsset
} from "../../services/supabaseClient";
import "./AdminPanel.scss";

const TABS = [
  {id: "profile", label: "Profile & Contact"},
  {id: "projects", label: "Projects"},
  {id: "experience", label: "Experiences"},
  {id: "publications", label: "Publications & Books"},
  {id: "security", label: "Password & Auth"}
];

function cloneData(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function AdminPanel({onExit}) {
  const {isDark} = useContext(StyleContext);
  const {portfolio, refreshPortfolio} = usePortfolio();

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("jamilkhanemon@gmail.com");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [focusField, setFocusField] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("profile");
  const [draft, setDraft] = useState(() => cloneData(portfolio));
  const [statusMsg, setStatusMsg] = useState({type: "", text: ""});
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setDraft(cloneData(portfolio));
  }, [portfolio]);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({data}) => {
      setSession(data.session || null);
      setAuthLoading(false);
    });
    const {
      data: {subscription}
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const showStatus = (type, text) => {
    setStatusMsg({type, text});
    setTimeout(() => setStatusMsg({type: "", text: ""}), 4000);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setAuthError("");
    if (!supabase) {
      setAuthError("Supabase keys are not configured yet. Check SUPABASE_SETUP.md.");
      return;
    }
    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
      setAuthError(error.message);
    } else {
      setPassword("");
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await savePortfolioData(draft);
      await refreshPortfolio();
      showStatus("success", "Published live! Changes are now visible on your portfolio.");
    } catch (err) {
      showStatus("error", err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file, onUrlReady, key) => {
    if (!file) return;
    setUploadingKey(key);
    try {
      const publicUrl = await uploadPortfolioAsset(file);
      onUrlReady(publicUrl);
      showStatus("success", "Image uploaded! Click 'Save & Publish' to apply.");
    } catch (err) {
      showStatus("error", err.message || "Image upload failed.");
    } finally {
      setUploadingKey("");
    }
  };

  const handleChangePassword = async e => {
    e.preventDefault();
    if (!supabase || newPassword.length < 6) {
      showStatus("error", "Password must be at least 6 characters.");
      return;
    }
    const {error} = await supabase.auth.updateUser({password: newPassword});
    if (error) {
      showStatus("error", error.message);
    } else {
      setNewPassword("");
      showStatus("success", "Admin password updated successfully!");
    }
  };

  const updateProject = (idx, field, val) => {
    setDraft(prev => {
      const next = cloneData(prev);
      next.bigProjects.projects[idx][field] = val;
      return next;
    });
  };

  const updateExperience = (idx, field, val) => {
    setDraft(prev => {
      const next = cloneData(prev);
      next.workExperiences.experience[idx][field] = val;
      return next;
    });
  };

  const updatePublication = (idx, field, val) => {
    setDraft(prev => {
      const next = cloneData(prev);
      next.achievementSection.achievementsCards[idx][field] = val;
      return next;
    });
  };

  if (authLoading) {
    return (
      <div className={`admin-shell ${isDark ? "dark" : "light"}`}>
        <div className="admin-card">Loading Admin Studio...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={`admin-shell ${isDark ? "dark" : "light"}`}>
        <div className="admin-login-card">
          <AdminMascot
            focusField={focusField}
            emailLength={email.length}
            showPassword={showPassword}
            hasError={Boolean(authError)}
          />
          <div className="admin-login-header">
            <span className="admin-eyebrow">PORTFOLIO CMS</span>
            <h2>Admin Sign In</h2>
            <p>Sign in with your Email &amp; Password to manage live portfolio content.</p>
          </div>

          {authError && <div className="admin-alert error">{authError}</div>}

          <form onSubmit={handleLogin} className="admin-form">
            <label>
              Admin Email
              <input
                type="email"
                value={email}
                onFocus={() => setFocusField("email")}
                onBlur={() => setFocusField("idle")}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <div className="password-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onFocus={() => setFocusField("password")}
                  onBlur={() => setFocusField("idle")}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={showPassword ? "far fa-eye-slash" : "far fa-eye"} />
                </button>
              </div>
            </label>
            <button type="submit" className="admin-btn primary">
              Sign In to Dashboard
            </button>
          </form>

          <button type="button" className="admin-btn ghost" onClick={onExit}>
            &larr; Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-shell ${isDark ? "dark" : "light"}`}>
      <header className="admin-topbar">
        <div>
          <span className="admin-eyebrow">LIVE PORTFOLIO CMS</span>
          <h1>Jamil&apos;s Admin Studio</h1>
        </div>
        <div className="admin-topbar-actions">
          <button type="button" className="admin-btn ghost" onClick={onExit}>
            View Site
          </button>
          <button
            type="button"
            className="admin-btn primary"
            onClick={handleSaveAll}
            disabled={saving}
          >
            {saving ? "Publishing..." : "Save & Publish"}
          </button>
          <button
            type="button"
            className="admin-btn danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg.text && (
        <div className={`admin-alert ${statusMsg.type}`}>{statusMsg.text}</div>
      )}

      <nav className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="admin-content">
        {activeTab === "profile" && (
          <div className="admin-grid">
            <div className="admin-card">
              <h3>Hero &amp; Bio</h3>
              <label>
                Greeting Title
                <input
                  type="text"
                  value={draft.greeting.title || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      greeting: {...p.greeting, title: e.target.value}
                    }))
                  }
                />
              </label>
              <label>
                Subtitle / Bio
                <textarea
                  rows={4}
                  value={draft.greeting.subTitle || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      greeting: {...p.greeting, subTitle: e.target.value}
                    }))
                  }
                />
              </label>
              <label>
                Resume Link
                <input
                  type="text"
                  value={draft.greeting.resumeLink || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      greeting: {...p.greeting, resumeLink: e.target.value}
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-card">
              <h3>Contact &amp; Social</h3>
              <label>
                Contact Email
                <input
                  type="email"
                  value={draft.contactInfo.email_address || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      contactInfo: {
                        ...p.contactInfo,
                        email_address: e.target.value
                      },
                      socialMediaLinks: {
                        ...p.socialMediaLinks,
                        gmail: e.target.value
                      }
                    }))
                  }
                />
              </label>
              <label>
                WhatsApp / Phone Number
                <input
                  type="text"
                  value={draft.contactInfo.number || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      contactInfo: {...p.contactInfo, number: e.target.value}
                    }))
                  }
                />
              </label>
              <label>
                GitHub URL
                <input
                  type="text"
                  value={draft.socialMediaLinks.github || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      socialMediaLinks: {
                        ...p.socialMediaLinks,
                        github: e.target.value
                      }
                    }))
                  }
                />
              </label>
              <label>
                LinkedIn URL
                <input
                  type="text"
                  value={draft.socialMediaLinks.linkedin || ""}
                  onChange={e =>
                    setDraft(p => ({
                      ...p,
                      socialMediaLinks: {
                        ...p.socialMediaLinks,
                        linkedin: e.target.value
                      }
                    }))
                  }
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="admin-list">
            <div className="admin-list-header">
              <h3>Featured Projects ({draft.bigProjects.projects.length})</h3>
              <button
                type="button"
                className="admin-btn primary"
                onClick={() =>
                  setDraft(p => ({
                    ...p,
                    bigProjects: {
                      ...p.bigProjects,
                      projects: [
                        {
                          projectName: "New AI Project",
                          projectDesc: "Project description...",
                          image: ""
                        },
                        ...p.bigProjects.projects
                      ]
                    }
                  }))
                }
              >
                + Add Project
              </button>
            </div>

            {draft.bigProjects.projects.map((proj, idx) => (
              <div key={idx} className="admin-card">
                <div className="admin-item-head">
                  <strong>{proj.projectName || `Project #${idx + 1}`}</strong>
                  <button
                    type="button"
                    className="admin-btn danger small"
                    onClick={() =>
                      setDraft(p => ({
                        ...p,
                        bigProjects: {
                          ...p.bigProjects,
                          projects: p.bigProjects.projects.filter(
                            (_, i) => i !== idx
                          )
                        }
                      }))
                    }
                  >
                    Delete
                  </button>
                </div>
                <label>
                  Project Name
                  <input
                    type="text"
                    value={proj.projectName || ""}
                    onChange={e =>
                      updateProject(idx, "projectName", e.target.value)
                    }
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows={3}
                    value={proj.projectDesc || ""}
                    onChange={e =>
                      updateProject(idx, "projectDesc", e.target.value)
                    }
                  />
                </label>
                <div className="admin-upload-row">
                  <label className="flex-1">
                    Image URL
                    <input
                      type="text"
                      value={typeof proj.image === "string" ? proj.image : ""}
                      placeholder="Paste image URL or upload"
                      onChange={e => updateProject(idx, "image", e.target.value)}
                    />
                  </label>
                  <label className="upload-btn">
                    {uploadingKey === `proj-${idx}` ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={e =>
                        handleImageUpload(
                          e.target.files[0],
                          url => updateProject(idx, "image", url),
                          `proj-${idx}`
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "experience" && (
          <div className="admin-list">
            <div className="admin-list-header">
              <h3>Work Experiences ({draft.workExperiences.experience.length})</h3>
              <button
                type="button"
                className="admin-btn primary"
                onClick={() =>
                  setDraft(p => ({
                    ...p,
                    workExperiences: {
                      ...p.workExperiences,
                      experience: [
                        {
                          role: "AI Engineer",
                          company: "Company Name",
                          date: "2026 – Present",
                          desc: "Role summary...",
                          descBullets: ["Key achievement"],
                          companylogo: ""
                        },
                        ...p.workExperiences.experience
                      ]
                    }
                  }))
                }
              >
                + Add Experience
              </button>
            </div>

            {draft.workExperiences.experience.map((exp, idx) => (
              <div key={idx} className="admin-card">
                <div className="admin-item-head">
                  <strong>
                    {exp.role} @ {exp.company}
                  </strong>
                  <button
                    type="button"
                    className="admin-btn danger small"
                    onClick={() =>
                      setDraft(p => ({
                        ...p,
                        workExperiences: {
                          ...p.workExperiences,
                          experience: p.workExperiences.experience.filter(
                            (_, i) => i !== idx
                          )
                        }
                      }))
                    }
                  >
                    Delete
                  </button>
                </div>
                <div className="admin-grid">
                  <label>
                    Role
                    <input
                      type="text"
                      value={exp.role || ""}
                      onChange={e => updateExperience(idx, "role", e.target.value)}
                    />
                  </label>
                  <label>
                    Company
                    <input
                      type="text"
                      value={exp.company || ""}
                      onChange={e =>
                        updateExperience(idx, "company", e.target.value)
                      }
                    />
                  </label>
                </div>
                <label>
                  Date Range
                  <input
                    type="text"
                    value={exp.date || ""}
                    onChange={e => updateExperience(idx, "date", e.target.value)}
                  />
                </label>
                <label>
                  Summary
                  <textarea
                    rows={2}
                    value={exp.desc || ""}
                    onChange={e => updateExperience(idx, "desc", e.target.value)}
                  />
                </label>
                <label>
                  Bullet Points (one per line)
                  <textarea
                    rows={3}
                    value={(exp.descBullets || []).join("\n")}
                    onChange={e =>
                      updateExperience(
                        idx,
                        "descBullets",
                        e.target.value.split("\n").filter(Boolean)
                      )
                    }
                  />
                </label>
                <div className="admin-upload-row">
                  <label className="flex-1">
                    Company Logo URL
                    <input
                      type="text"
                      value={
                        typeof exp.companylogo === "string"
                          ? exp.companylogo
                          : ""
                      }
                      placeholder="Paste logo URL or upload"
                      onChange={e =>
                        updateExperience(idx, "companylogo", e.target.value)
                      }
                    />
                  </label>
                  <label className="upload-btn">
                    {uploadingKey === `exp-${idx}` ? "Uploading..." : "Upload Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={e =>
                        handleImageUpload(
                          e.target.files[0],
                          url => updateExperience(idx, "companylogo", url),
                          `exp-${idx}`
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "publications" && (
          <div className="admin-list">
            <div className="admin-list-header">
              <h3>
                Publications &amp; Books (
                {draft.achievementSection.achievementsCards.length})
              </h3>
              <button
                type="button"
                className="admin-btn primary"
                onClick={() =>
                  setDraft(p => ({
                    ...p,
                    achievementSection: {
                      ...p.achievementSection,
                      achievementsCards: [
                        {
                          title: "New Publication / Book",
                          subtitle: "Journal / Publisher details...",
                          image: "",
                          imageAlt: "Publication",
                          fullBleed: true,
                          footerLink: [{name: "View Paper", url: "https://"}]
                        },
                        ...p.achievementSection.achievementsCards
                      ]
                    }
                  }))
                }
              >
                + Add Publication
              </button>
            </div>

            {draft.achievementSection.achievementsCards.map((pub, idx) => (
              <div key={idx} className="admin-card">
                <div className="admin-item-head">
                  <strong>{pub.title || `Publication #${idx + 1}`}</strong>
                  <button
                    type="button"
                    className="admin-btn danger small"
                    onClick={() =>
                      setDraft(p => ({
                        ...p,
                        achievementSection: {
                          ...p.achievementSection,
                          achievementsCards:
                            p.achievementSection.achievementsCards.filter(
                              (_, i) => i !== idx
                            )
                        }
                      }))
                    }
                  >
                    Delete
                  </button>
                </div>
                <label>
                  Title
                  <input
                    type="text"
                    value={pub.title || ""}
                    onChange={e =>
                      updatePublication(idx, "title", e.target.value)
                    }
                  />
                </label>
                <label>
                  Subtitle / Description
                  <textarea
                    rows={3}
                    value={pub.subtitle || ""}
                    onChange={e =>
                      updatePublication(idx, "subtitle", e.target.value)
                    }
                  />
                </label>
                <div className="admin-grid">
                  <label>
                    Button Label
                    <input
                      type="text"
                      value={
                        (pub.footerLink &&
                          pub.footerLink[0] &&
                          pub.footerLink[0].name) ||
                        ""
                      }
                      onChange={e =>
                        updatePublication(idx, "footerLink", [
                          {
                            name: e.target.value,
                            url:
                              (pub.footerLink &&
                                pub.footerLink[0] &&
                                pub.footerLink[0].url) ||
                              ""
                          }
                        ])
                      }
                    />
                  </label>
                  <label>
                    Paper / Book URL
                    <input
                      type="text"
                      value={
                        (pub.footerLink &&
                          pub.footerLink[0] &&
                          pub.footerLink[0].url) ||
                        ""
                      }
                      onChange={e =>
                        updatePublication(idx, "footerLink", [
                          {
                            name:
                              (pub.footerLink &&
                                pub.footerLink[0] &&
                                pub.footerLink[0].name) ||
                              "View",
                            url: e.target.value
                          }
                        ])
                      }
                    />
                  </label>
                </div>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={Boolean(pub.fullBleed)}
                    onChange={e =>
                      updatePublication(idx, "fullBleed", e.target.checked)
                    }
                  />
                  <span>Full-bleed cover image (best for book covers)</span>
                </label>
                <div className="admin-upload-row">
                  <label className="flex-1">
                    Cover / Logo URL
                    <input
                      type="text"
                      value={typeof pub.image === "string" ? pub.image : ""}
                      placeholder="Paste image URL or upload"
                      onChange={e =>
                        updatePublication(idx, "image", e.target.value)
                      }
                    />
                  </label>
                  <label className="upload-btn">
                    {uploadingKey === `pub-${idx}` ? "Uploading..." : "Upload Cover"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={e =>
                        handleImageUpload(
                          e.target.files[0],
                          url => updatePublication(idx, "image", url),
                          `pub-${idx}`
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "security" && (
          <div className="admin-card">
            <h3>Update Admin Password</h3>
            <p className="muted">
              Signed in as: <strong>{session.user && session.user.email}</strong>
            </p>
            <form onSubmit={handleChangePassword} className="admin-form">
              <label>
                New Password (min 6 characters)
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </label>
              <button type="submit" className="admin-btn primary">
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
