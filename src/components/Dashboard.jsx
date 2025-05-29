import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${usersPerPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        // Get total count from headers for pagination
        const totalCount = response.headers.get("x-total-count");
        setTotalPages(Math.ceil(totalCount / usersPerPage));

        const data = await response.json();
        setUsers(data);
        setFilterUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Add search filtering
  useEffect(() => {
    if (searchUser.trim() === "") {
      setFilterUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
      );
      setFilterUsers(filtered);
    }
  }, [searchUser, users]);

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="text-center text-white">
          <div
            className="spinner-border text-light mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading users...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="text-center text-white">
          <div className="alert alert-danger">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="min-vh-100"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container py-5">
          <div
            className="dashboard-container p-4 p-md-5"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Header */}
            <div className="text-center mb-5">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <div>
                  <h1 className="display-4 fw-bold text-primary mb-0">
                    User Dashboard
                  </h1>
                  <p className="lead text-muted text-dark mb-0">
                    Manage and explore user profiles
                  </p>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-6">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users by name..."
                    value={searchUser}
                    onChange={handleSearchChange}
                    style={{
                      borderRadius: "50px",
                      border: "2px solid #e3f2fd",
                      background: "white",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      paddingLeft: "45px",
                      paddingRight: "20px",
                      height: "50px",
                      fontSize: "1rem",
                    }}
                  />
                  <i
                    className="bi bi-search text-primary position-absolute"
                    style={{
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.2rem",
                    }}
                  ></i>
                  {searchUser && (
                    <button
                      className="btn btn-link position-absolute end-0 pe-4"
                      style={{
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#667eea",
                        textDecoration: "none",
                        zIndex: 1,
                      }}
                      onClick={() => setSearchUser("")}
                    >
                      <i className="bi bi-x-circle-fill fs-5"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* User Cards */}
            <div className="row">
              {filterUsers.length > 0 ? (
                filterUsers.map((user) => (
                  <div key={user.id} className="col-md-6 mb-4">
                    <div
                      className="card h-100"
                      style={{
                        background: "white",
                        borderRadius: "15px",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                        transition: "all 0.3s ease",
                        border: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                          "0 20px 40px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 30px rgba(0, 0, 0, 0.12)";
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                            }}
                          >
                            <i className="bi bi-person-fill fs-2"></i>
                          </div>
                          <div>
                            <h5 className="card-title mb-1 fw-bold text-primary">
                              {user.name}
                            </h5>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-envelope text-secondary me-2"></i>
                            <span className="small text-dark">
                              {user.email}
                            </span>
                          </div>

                          <div className="d-flex align-items-center">
                            <i className="bi bi-telephone text-secondary me-2"></i>
                            <span className="small text-dark">
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div
                    className="alert alert-info text-center"
                    style={{
                      borderRadius: "15px",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    No users found matching your search.
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-5">
                <div className="d-flex justify-content-center">
                  <ul
                    className="pagination mb-0"
                    style={{
                      background: "white",
                      borderRadius: "50px",
                      padding: "10px 20px",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          margin: "0 5px",
                          color: "#667eea",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                            style={{
                              border: "none",
                              borderRadius: "10px",
                              margin: "0 5px",
                              color: currentPage === page ? "white" : "#667eea",
                              background:
                                currentPage === page
                                  ? "#667eea"
                                  : "transparent",
                              fontWeight: "500",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        style={{
                          border: "none",
                          borderRadius: "10px",
                          margin: "0 5px",
                          color: "#667eea",
                          fontWeight: "500",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
