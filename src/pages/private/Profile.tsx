import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "@/layout/Layout";
import CardTweet from "@/components/tweets/CardTweet";
import Trending from "@/components/tweets/Trending";
import Follow from "@/components/tweets/Follow";
import FooterPrivate from "@/components/tweets/FooterPrivate";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import NavTabs from "@/components/widgets/NavTabs";
import InputSearch from "@/components/widgets/InputSearch";
import IconSVG from "@/components/widgets/IconSVG";
import ButtonCustom from "@/components/widgets/ButtonCustom";
import { tweetRoutes } from "@/routes/tweet.routes";
import { baseURL } from "@/api";
import { IAuthUserProfile, TAuthUserReducer, TTabState } from "@/models";

type Props = { currentUser: IAuthUserProfile | null };

const Profile: React.FC<Props> = ({ currentUser }) => {
  const tabState: TTabState[] = [
    { id: 1, title: "Tweets" },
    { id: 2, title: "Tweets & replies" },
    { id: 3, title: "Media" },
    { id: 4, title: "Likes" },
  ];
  const [activeTab, setActiveTab] = React.useState(1);

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = tweetRoutes.profile.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="Profile">
          <section className="sec-header">
            <SectionHeaderTweet
              page={tweetRoutes.profile.name}
              title={`${currentUser?.user.first_name} ${currentUser?.user.last_name}`}
              subtitle="1 Tweet"
            />
          </section>
          <div className="pro-container">
            <div className="info-profile-container">
              <div className="cover-profile-pic">
                <img
                  src={
                    currentUser?.coverPicture
                      ? baseURL + currentUser.coverPicture
                      : baseURL + "/mediafiles/default/coverPic.jpg"
                  }
                  alt=""
                />
                <img
                  className="profile-pic"
                  src={
                    currentUser?.profilePicture
                      ? baseURL + currentUser.profilePicture
                      : baseURL + "/mediafiles/default/coverPic.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="info-profile-container">
                <ButtonCustom text="Edit profile" />
                <div className="info-profile">
                  <div className="box-info-name">
                    <h3>
                      {currentUser?.user.first_name} {currentUser?.user.last_name}
                    </h3>
                    <p>@{currentUser?.pseudo}</p>
                  </div>
                  <div className="box-info-date-joined">
                    <IconSVG iconName="calendar" fill="#919090" />
                    <p>Joined August 2019</p>
                  </div>
                  <div className="box-info-follow">
                    <Link to="">
                      <span>20</span>
                      <p>Following</p>
                    </Link>
                    <Link to="">
                      <span>45</span>
                      <p>Follower</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <nav>
              <NavTabs listTabs={tabState} activeTab={activeTab} flexGrow={2} toggleTab={toggleTab} />
            </nav>
            <div className="my-content-container">
              {(activeTab === 1 || activeTab === 2) && (
                <div className="tabs-tweets">
                  <div className="list-post">
                    <CardTweet currentUser={currentUser} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <aside className="aside">
        <div className="search-container">
          <InputSearch />
        </div>
        <div className="trends-container">
          <h3>You might like</h3>
          {[1, 2, 3].map((n, index) => (
            <Follow key={index} />
          ))}
        </div>
        <div className="footer-container">
          <div className="follow-container">
            <h3>Trends for you</h3>
            {[1, 2, 3, 4, 5, 6, 7].map((n, index) => (
              <Trending key={index} />
            ))}
            <span className="show-more">Show more</span>
          </div>
          <FooterPrivate />
        </div>
      </aside>
    </>
  );
};

const ProfileConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Profile currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(ProfileConnectWithStore);
