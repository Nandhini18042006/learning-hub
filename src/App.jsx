import React, { useState } from "react";
import { useRole } from "./roleContext";

function Card({ title, description }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <p className="card-desc">{description}</p>
    </div>
  );
}

function SuperAdminDashboard() {
  return (
    <div className="section">
      <h2 className="section-title">Super Admin overview</h2>
      <p className="section-text">
        Configure the LMS globally: branding, roles, security, and analytics
        across all organizations.
      </p>
      <div className="grid">
        <Card
          title="Platform analytics"
          description="Total organizations, users, active courses, and engagement."
        />
        <Card
          title="Role & access control"
          description="Manage Super Admin, Admin, Trainer, and Learner permissions."
        />
        <Card
          title="System settings"
          description="Branding, email templates, authentication and security."
        />
      </div>
    </div>
  );
}

function AdminDashboard({ enrolledCourses, catalogCourses, onAdminEnroll }) {
  const [selectedCourseId, setSelectedCourseId] = useState(
    catalogCourses[0]?.id || ""
  );

  return (
    <div className="section">
      <h2 className="section-title">Admin / HR</h2>
      <p className="section-text">
        Manage users, enrollments, and compliance for your organization.
      </p>
      <div className="grid">
        <Card
          title="User management"
          description="Create users, assign roles, and manage departments."
        />
        <div className="card">
          <p className="card-title">Enrollments</p>
          <p className="card-desc">
            Enroll the active learner into a course from the catalog.
          </p>
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ color: "#9ca3af" }}>Active learner: </span>
              <strong>Alex Doe</strong>
            </div>
            <label style={{ display: "block", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>
                Select course
              </span>
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid rgba(55,65,81,0.9)",
                background: "#020617",
                color: "#e5e7eb",
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {catalogCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <button
              className="role-pill role-pill-active"
              style={{
                fontSize: 11,
                border: "none",
                padding: "6px 14px",
                marginTop: 2,
              }}
              onClick={() => {
                if (!selectedCourseId) return;
                onAdminEnroll(selectedCourseId);
              }}
            >
              Enroll learner
            </button>
          </div>
        </div>
        <Card
          title="Reports"
          description="Track completion, overdue training, and compliance."
        />
      </div>
    </div>
  );
}

function TrainerDashboard({ catalogCourses, onCreateCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="section">
      <h2 className="section-title">Trainer</h2>
      <p className="section-text">
        Create courses, lessons, and assessments, then monitor learner
        performance.
      </p>
      <div className="grid">
        <div className="card">
          <p className="card-title">Create a new course</p>
          <p className="card-desc">
            Add a course to the catalog that learners and admins can enroll
            into.
          </p>
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <div style={{ marginBottom: 6 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#9ca3af",
                  marginBottom: 2,
                }}
              >
                Course title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced React Patterns"
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: 8,
                  border: "1px solid rgba(55,65,81,0.9)",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: 12,
                }}
              />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#9ca3af",
                  marginBottom: 2,
                }}
              >
                Short description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will learners gain from this course?"
                rows={3}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: 8,
                  border: "1px solid rgba(55,65,81,0.9)",
                  background: "#020617",
                  color: "#e5e7eb",
                  fontSize: 12,
                  resize: "vertical",
                }}
              />
            </div>
            <button
              className="role-pill role-pill-active"
              style={{
                fontSize: 11,
                border: "none",
                padding: "6px 14px",
                marginTop: 4,
              }}
              onClick={() => {
                if (!title.trim()) return;
                onCreateCourse({
                  title: title.trim(),
                  description: description.trim() || "New trainer-created course",
                });
                setTitle("");
                setDescription("");
              }}
            >
              Add to catalog
            </button>
          </div>
        </div>
        <Card
          title="Learner insights"
          description="Track progress and scores in your courses."
        />
      </div>
    </div>
  );
}

const initialEnrolledCourses = [
  {
    id: "course-1",
    title: "React Basics for New Hires",
    description: "Learn components, state, props, and hooks.",
    progress: 60,
    lessonsCompleted: 6,
    totalLessons: 10,
  },
  {
    id: "course-2",
    title: "Security Awareness Essentials",
    description: "Policies, phishing, passwords, and best practices.",
    progress: 35,
    lessonsCompleted: 7,
    totalLessons: 20,
  },
];

const initialCatalogCourses = [
  {
    id: "course-3",
    title: "Time Management Skills",
    description: "Plan, prioritize, and execute your daily work effectively.",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 8,
  },
  {
    id: "course-4",
    title: "Effective Communication",
    description: "Improve written, verbal, and remote collaboration skills.",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 6,
  },
];

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("learner");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name: name.trim(), role });
  }

  return (
    <div className="login-overlay">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="section-subtitle" style={{ marginBottom: 4 }}>
          Welcome to Learning Hub
        </p>
        <p className="section-text" style={{ fontSize: 12, marginBottom: 12 }}>
          Sign in and pick a role to explore the LMS.
        </p>
        <label className="login-label">
          Name
          <input
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label className="login-label">
          Role
          <select
            className="login-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="learner">Learner</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin / HR</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </label>
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
    </div>
  );
}

function LearnerDashboard({ enrolledCourses, catalogCourses, onEnroll }) {
  const [tab, setTab] = useState("enrolled"); // "enrolled" | "catalog"
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const lastCourse = enrolledCourses[0];

  const lessons = [
    { id: "l1", title: "Welcome & overview", duration: "5 min" },
    { id: "l2", title: "Module introduction", duration: "10 min" },
    { id: "l3", title: "Hands-on practice", duration: "20 min" },
    { id: "l4", title: "Knowledge check quiz", duration: "8 min" },
  ];
  const completedLessons = Math.min(currentLessonIndex, lessons.length);
  const lessonProgress = Math.round(
    (completedLessons / lessons.length) * 100
  );
  const safeIndex = Math.min(currentLessonIndex, lessons.length - 1);
  const currentLesson = lessons[safeIndex];

  return (
    <div className="section section-column">
      <section className="hero">
        <div className="hero-main">
          <p className="hero-kicker">Enrollment &amp; learning flow</p>
          <h2 className="hero-title">Continue your self-paced learning</h2>
          <p className="hero-text">
            Track lesson completion, resume where you left, and stay on top of
            your training.
          </p>
        </div>
        {lastCourse && (
          <div className="hero-course">
            <p className="hero-course-kicker">Continue course</p>
            <p className="hero-course-title">{lastCourse.title}</p>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${lastCourse.progress}%` }}
              />
            </div>
            <p className="hero-course-meta">
              {lastCourse.lessonsCompleted} of {lastCourse.totalLessons} lessons
              completed
            </p>
          </div>
        )}
      </section>

      <section>
        <div className="section-header">
          <h3 className="section-subtitle">Self-paced learning flow</h3>
          <p className="section-text" style={{ margin: 0, fontSize: 11 }}>
            Complete lessons one by one at your own speed.
          </p>
        </div>
        <div className="card" style={{ marginBottom: 8 }}>
          <p className="card-title" style={{ marginBottom: 4 }}>
            Lesson progress: {lessonProgress}%
          </p>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${lessonProgress}%` }}
            />
          </div>
          {completedLessons >= lessons.length ? (
            <p className="section-text" style={{ marginTop: 8, fontSize: 12 }}>
              All lessons completed. Great job!
            </p>
          ) : (
            <>
              <p
                className="section-text"
                style={{ marginTop: 8, fontSize: 12 }}
              >
                Current lesson:{" "}
                <strong>{currentLesson.title}</strong> ·{" "}
                {currentLesson.duration}
              </p>
              <button
                className="login-button"
                type="button"
                style={{ marginTop: 8, paddingInline: 14 }}
                onClick={() =>
                  setCurrentLessonIndex((prev) => Math.min(prev + 1, lessons.length))
                }
              >
                Mark lesson complete &amp; continue
              </button>
            </>
          )}
        </div>
      </section>

      <div className="section-header" style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className={
              tab === "enrolled" ? "role-pill role-pill-active" : "role-pill"
            }
            onClick={() => setTab("enrolled")}
          >
            Enrolled
          </button>
          <button
            className={
              tab === "catalog" ? "role-pill role-pill-active" : "role-pill"
            }
            onClick={() => setTab("catalog")}
          >
            Catalog
          </button>
        </div>
      </div>

      {tab === "enrolled" && (
        <section>
          <div className="section-header">
            <h3 className="section-subtitle">Your enrolled courses</h3>
          </div>
          <div className="grid">
            {enrolledCourses.length === 0 && (
              <p className="section-text">
                You aren't enrolled in any courses yet. Open the Catalog tab to
                enroll.
              </p>
            )}
            {enrolledCourses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-card-inner">
                  <h4 className="course-title">{course.title}</h4>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-meta">
                    <span>
                      {course.lessonsCompleted}/{course.totalLessons} lessons
                    </span>
                    <span className="course-progress-text">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "catalog" && (
        <section>
          <div className="section-header">
            <h3 className="section-subtitle">Course catalog</h3>
            <p className="section-text" style={{ margin: 0, fontSize: 11 }}>
              Browse available courses and click enroll.
            </p>
          </div>
          <div className="grid">
            {catalogCourses.map((course) => {
              const isEnrolled = enrolledCourses.some(
                (c) => c.id === course.id
              );
              return (
                <div key={course.id} className="course-card">
                  <div className="course-card-inner">
                    <h4 className="course-title">{course.title}</h4>
                    <p className="course-desc">{course.description}</p>
                    <div className="course-meta">
                      <span>{course.totalLessons} lessons</span>
                      {isEnrolled ? (
                        <span className="course-progress-text">Enrolled</span>
                      ) : (
                        <button
                          className="link-button"
                          onClick={() => onEnroll(course.id)}
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function Layout({ children }) {
  const { role, setRole } = useRole();
  const roles = [
    { id: "super-admin", label: "Super Admin" },
    { id: "admin", label: "Admin" },
    { id: "trainer", label: "Trainer" },
    { id: "learner", label: "Learner" },
  ];

  return (
    <div className="page">
      <div className="page-inner">
        <header className="header">
          <div className="brand">
            <div className="brand-logo">L</div>
            <div>
              <h1 className="brand-title">Learning Hub</h1>
              <p className="brand-subtitle">
                Unified LMS for Super Admin, Admin, Trainer &amp; Learner
              </p>
            </div>
          </div>
          <div className="role-switch">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={
                  role === r.id ? "role-pill role-pill-active" : "role-pill"
                }
              >
                {r.label}
              </button>
            ))}
          </div>
        </header>

        <main className="content">{children}</main>

        <footer className="footer">
          © {new Date().getFullYear()} Learning Hub LMS
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const { role, setRole } = useRole();
  const [enrolledCourses, setEnrolledCourses] = useState(
    initialEnrolledCourses
  );
  const [catalogCourses, setCatalogCourses] = useState(initialCatalogCourses);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  function handleEnroll(courseId) {
    // If already enrolled, do nothing
    if (enrolledCourses.some((c) => c.id === courseId)) {
      return;
    }
    const courseToEnroll = catalogCourses.find((c) => c.id === courseId);
    if (!courseToEnroll) return;
    setEnrolledCourses((prev) => [...prev, courseToEnroll]);
  }

  function handleCreateCourse({ title, description }) {
    const id = `course-${catalogCourses.length + enrolledCourses.length + 1}`;
    const newCourse = {
      id,
      title,
      description,
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
    };
    setCatalogCourses((prev) => [...prev, newCourse]);
  }

  if (!isLoggedIn) {
    return (
      <Layout>
        <LoginScreen
          onLogin={({ name, role }) => {
            setUserName(name);
            setIsLoggedIn(true);
            setRole(role);
          }}
        />
      </Layout>
    );
  }

  let content;
  if (role === "super-admin") content = <SuperAdminDashboard />;
  else if (role === "admin")
    content = (
      <AdminDashboard
        enrolledCourses={enrolledCourses}
        catalogCourses={catalogCourses}
        onAdminEnroll={handleEnroll}
      />
    );
  else if (role === "trainer")
    content = (
      <TrainerDashboard
        catalogCourses={catalogCourses}
        onCreateCourse={handleCreateCourse}
      />
    );
  else
    content = (
      <LearnerDashboard
        enrolledCourses={enrolledCourses}
        catalogCourses={catalogCourses}
        onEnroll={handleEnroll}
      />
    );

  return <Layout>{content}</Layout>;
}

