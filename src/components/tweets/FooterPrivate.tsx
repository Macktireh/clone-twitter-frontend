import * as React from "react";

import IconSVG from "@/components/widgets/IconSVG";

const FooterPrivate: React.FC = () => {
  return (
    <footer>
      <div>Terms of Service</div>
      <div>Privacy Policy</div>
      <div>Cookie Policy</div>
      <div>Accessibility</div>
      <div>Ads info</div>
      <div>
        <span>More</span>
        <IconSVG iconName="3-dot" fill="#919090" />
      </div>
      <div>© 2022 Twitter, Inc.</div>
    </footer>
  );
};

export default FooterPrivate;
