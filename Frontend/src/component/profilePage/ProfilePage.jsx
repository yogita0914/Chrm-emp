import "./ProfilePage.css";
import profileIcon from "../../assets/images/profile-circle-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfilePage = () => {
  const location = useLocation();
  const { userName, logoutUser, updateUserName } = useCart();
  const navigate = useNavigate();

  // Assuming the user profile is passed in location state (after login)
  const userProfile = location.state?.userProfile || { name: "", email: "" };

  const [formData, setFormData] = useState({
    name: userProfile.name || userName,
    email: userProfile.email || "",
    mobile: "",
    gender: "",
    address: "",
    pinCode: "",
  });

  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    mobile: false,
    gender: false,
    address: "",
    pinCode: "",
  });

  const [displayedName, setDisplayedName] = useState(
    userProfile.name || userName
  );

  useEffect(() => {
    // Update displayed name if userName changes
    setDisplayedName(userName);
  }, [userName]);

  // Capitalize the first letter of the user's name
  const capitalizeName = (name) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogout = () => {
    logoutUser();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { state: { resetForm: true } });
  };
  const toggleEdit = (field) => {
    setIsEditable((prevEditable) => ({
      ...prevEditable,
      [field]: !prevEditable[field],
    }));
  };

  // Handle saving the name change
  const handleSaveName = () => {
    if (formData.name.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    setDisplayedName(formData.name);
    setIsEditable((prevEditable) => ({
      ...prevEditable,
      name: false,
    }));
    updateUserName(formData.name);
  };

  return (
    <div className="mainProfilePage">
      <div className="profileDetails">
        <img className="myProfileIcon" src={profileIcon} alt="profile" />
        {/* Display the username below the profile icon */}
        <p className="myName">{capitalizeName(displayedName)}</p>
        <div className="profilePhotoActions">
          <button className="addPhotoButton">Add Profile Picture</button>
        </div>
        <div className="accountIcon">
          <div className="accountInformation">
            <FavoriteIcon className="accountImage" />
            <h3>
              <Link
                to="/wishlist"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Wishlist Products
              </Link>
            </h3>
          </div>
          <div className="accountInformation">
            <ShoppingBagIcon className="accountImage" />
            <h3>
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "#000" }}
              >
                My Orders
              </Link>
            </h3>
          </div>
          <div className="accountInformation">
            <LockIcon className="accountImage" />
            <h3>
              <Link
                to="/privacypolicy"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Privacy
              </Link>
            </h3>
          </div>
          <div className="accountInformation">
            <PrivacyTipIcon className="accountImage" />
            <h3>
              <Link
                to="/terms"
                style={{ textDecoration: "none", color: "#000" }}
              >
                Term & Condition
              </Link>
            </h3>
          </div>
          <div className="accountInformation" onClick={handleLogout}>
            <LogoutIcon className="accountImage" />
            <h3>Logout</h3>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <form className="profileForm">
          <div className="userPersonalData">
            <label className="profileLabel">Name</label>
            <button
              type="button"
              className="editButton"
              onClick={() => {
                if (isEditable.name) {
                  handleSaveName(); // Save the name and stop editing
                } else {
                  toggleEdit("name"); // Enable editing
                }
              }}
            >
              {isEditable.name ? (
                <SaveAltIcon fontSize="10px" />
              ) : (
                <EditIcon fontSize="10px" />
              )}
            </button>
          </div>
          <div className="name-input">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={handleInputChange}
              readOnly={!isEditable.name}
            />
          </div>
          <div className="userPersonalData">
            <label className="profileLabel">Enter your email</label>
            <button
              type="button"
              className="editButton"
              onClick={() => toggleEdit("email")}
            >
              {isEditable.email ? (
                <SaveAltIcon fontSize="10px" />
              ) : (
                <EditIcon fontSize="10px" />
              )}
            </button>
          </div>
          <div className="profile-input">
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditable.email}
            />
          </div>
          <div>
            <div className="userPersonalData">
              <label className="profileLabel">Your Gender</label>
              <button
                type="button"
                className="editButton"
                onClick={() => toggleEdit("gender")}
              >
                {isEditable.gender ? (
                  <SaveAltIcon fontSize="10px" />
                ) : (
                  <EditIcon fontSize="10px" />
                )}
              </button>
            </div>
            <div className="gender">
              <label className="radioInput">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                  disabled={!isEditable.gender}
                  readOnly={!isEditable.gender}
                />
                Male
              </label>
              <label className="radioInput">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                  disabled={!isEditable.gender}
                  readOnly={!isEditable.gender}
                />
                Female
              </label>
              <label className="radioInput">
                <input
                  type="radio"
                  name="gender"
                  value="transgender"
                  checked={formData.gender === "transgender"}
                  onChange={handleInputChange}
                  disabled={!isEditable.gender}
                  readOnly={!isEditable.gender}
                />
                Transgender
              </label>
            </div>
          </div>
          <div className="mobileNumber">
            <div className="userPersonalData">
              <label className="profileLabel">Mobile Number</label>
              <button
                type="button"
                className="editButton"
                onClick={() => toggleEdit("mobile")}
              >
                {isEditable.mobile ? (
                  <SaveAltIcon fontSize="10px" />
                ) : (
                  <EditIcon fontSize="10px" />
                )}
              </button>
            </div>
            <div className="profile-input">
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                readOnly={!isEditable.mobile}
              />
            </div>
          </div>
          <div className="userPersonalData">
            <label className="profileLabel">Address</label>
            <button
              type="button"
              className="editButton"
              onClick={() => toggleEdit("address")}
            >
              {isEditable.address ? (
                <SaveAltIcon fontSize="10px" />
              ) : (
                <EditIcon fontSize="10px" />
              )}
            </button>
          </div>
          <div className="address-input">
            <input
              type="text"
              name="address"
              placeholder="address 1"
              value={formData.address || ""}
              onChange={handleInputChange}
              readOnly={!isEditable.address}
            />
            <input
              type="text"
              name="address"
              placeholder="address 2"
              value={formData.address || ""}
              onChange={handleInputChange}
              readOnly={!isEditable.address}
            />
          </div>
          <div className="userPersonalData">
            <label className="profileLabel">PIN CODE</label>
            <button
              type="button"
              className="editButton"
              onClick={() => toggleEdit("pinCode")}
            >
              {isEditable.pinCode ? (
                <SaveAltIcon fontSize="10px" />
              ) : (
                <EditIcon fontSize="10px" />
              )}
            </button>
          </div>
          <div className="profile-input">
            <input
              type="number"
              name="pinCode"
              placeholder=""
              value={formData.pinCode || ""}
              onChange={handleInputChange}
              readOnly={!isEditable.pinCode}
            />
          </div>
        </form>
        <div className="suggestion">
          <h1>FAQs</h1>

          <h4>
            How do I update my email address or mobile number on Charm Emporium?
          </h4>
          <p>
            You can update your email or mobile number in the profile settings.
            Once updated, all order updates and notifications will be sent to
            your new contact details.
          </p>

          <h4>What is the return policy for Charm Emporium?</h4>
          <p>
            We offer easy returns and exchanges within 7 days of delivery. For
            more details, please visit our
            <Link
              to="/refundpolicy"
              style={{
                textDecoration: "none",
                color: "#007bff",
                marginLeft: "5px",
              }}
            >
              Refund & Return Policy
            </Link>
            .
          </p>

          <h4>How can I track my order?</h4>
          <p>
            You can track your order from the ‘My Orders’ section in your
            account. We’ll also send real-time updates via email and SMS.
          </p>

          {/* Add this link to navigate to the FAQ page */}
          <Link
            to="/faq"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
              marginTop: "10px",
              display: "inline-block",
            }}
          >
            View More FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
