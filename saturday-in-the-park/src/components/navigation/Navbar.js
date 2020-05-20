import React, { useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AppsIcon from "@material-ui/icons/Apps";
import { Link, useHistory } from "react-router-dom";
import { Menu, Input } from "semantic-ui-react";

export default function MenuExampleStackable({ user }) {
  const [activeItem, setActiveItem] = useState();
  let history = useHistory();
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(name);
  };

  return (
    <Menu>
      <Menu.Item>
        <Link to="/">
          <h1>Intenderary</h1>
        </Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Input
            transparent
            icon={{ name: "search", link: true }}
            placeholder="Search users..."
          />
        </Menu.Item>
        <Menu.Item
          name="myitinerary"
          active={activeItem === "features"}
          onClick={handleItemClick}
        >
          <AppsIcon />
        </Menu.Item>

        <Menu.Item
          name="myfavorite"
          active={activeItem === "myfavorite"}
          onClick={handleItemClick}
        >
          <FavoriteIcon />
        </Menu.Item>
        {user ? (
          <Menu.Item
            position="right"
            name="signout"
            active={activeItem === "signout"}
            onClick={handleItemClick}
          >
            <AccountCircle />
          </Menu.Item>
        ) : (
          <Menu.Item
            position="right"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
          >
            Sign-in
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
}
