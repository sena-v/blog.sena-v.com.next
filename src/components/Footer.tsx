import Link from "next/link"
import React from "react"

type UserDataType = {
  userData: {
    userName: string
    userInfo: string
  }
}

const Footer = ({ userData }: UserDataType) => {
  return (
    <footer
      style={{
        background: "#FFF176",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          margin: "0 auto",
          backgroundColor: "#2F2D32",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
        }}
      >
        <span className="auth">Author: </span>
        <span className="name">
          <Link
            href={userData.userInfo}
            style={{
              color: "white",
              textDecoration: "none",
            }}
            aria-label="about"
          >
            <b>{userData.userName}</b>
          </Link>
        </span>
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="auth">
          © {new Date().getFullYear()}, Built with Next.js
        </span>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  userData: {
    userName: "sena-v",
    userInfo: "https://github.com/sena-v",
  },
}

export default Footer
