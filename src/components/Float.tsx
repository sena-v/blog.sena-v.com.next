/* eslint-disable @next/next/no-img-element */
type userDataPropsType = {
  userData: {
    userName: string
    TwitterUrl: string
    GitHubUrl: string
    QiitaUrl: string
  }
}

const scrollTop = () => {
  window.scrollTo(0, 0)
}

function Float({ userData }: userDataPropsType) {
  return (
    <div
      style={{
        paddingTop: "1rem",
        paddingLeft: "1rem",
        textAlign: "right",
        backgroundColor: "#2F2D32",
      }}
    >
      <div
        style={{
          float: "left",
          position: "fixed",
          height: "300px",
          padding: "0.5rem",
          textAlign: "center",
          fontFamily: "Helvetica Neue",
        }}
      >
        <div className="imgDiv">
          <img
            src="/images/twitter.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.TwitterUrl)}
          />
        </div>
        <br />
        <div className="imgDiv">
          <img
            src="/images/github.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.GitHubUrl)}
          />
        </div>
        <br />
        <div className="imgDiv">
          <img
            src="/images/qiita.png"
            alt="画像"
            width="30px"
            height="30px"
            onClick={() => window.open(userData.QiitaUrl)}
          />
        </div>
        <div style={{ height: "200px" }} />
        <div className="imgDiv">
          <img
            src="/images/scrollTop.png"
            width="28px"
            height="28px"
            onClick={scrollTop}
            onKeyPress={scrollTop}
            alt="scroll top"
          />
        </div>
        <br />
      </div>
    </div>
  )
}

Float.defaultProps = {
  userData: {
    userName: "sena-v",
    TwitterUrl: "https://twitter.com/card1nal_tetra",
    GitHubUrl: "https://github.com/sena-v",
    QiitaUrl: "https://qiita.com/sena_v",
  },
}

export default Float

// アイコン：ttps://qiita.com/tkit/items/932316c5f5f7b162b61e#github
