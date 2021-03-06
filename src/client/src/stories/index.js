import React from "react";
import "./index.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import Trip from "../components/Trip/Trip";
import TripFormBasic from "../components/Trip/TripFormBasic";
import MobileTopNav from "../components/MobileTopNav";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf("Application", module).add("Mobile Top Nav", () => <MobileTopNav />);
storiesOf("Dashboard", module).add("Trip", () => <Trip />);

storiesOf("Trip", module).add("Trip Form", () => <TripFormBasic />);
