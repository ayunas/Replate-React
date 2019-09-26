import React, { useEffect, useState } from "react";
import axios from "axios";
import ScheduledPickupCards from "./ScheduledPickupCards";
import AvailablePickupCards from "./AvailablePickupCards";
import logo from "../../images/logo.png";
import userImage from "../../images/userImage.jpg";

export default function VolunteerDashboard() {
  const [pickup, setPickup] = useState([]); //holding pickup data
  const [volunteer, setVolunteer] = useState(["Volunteer"]); // state holding volunteer name
  const [address, setAddress] = useState([]); // state holding business address

  //axios call for volunteer name
  useEffect(() => {
    axios
      .get(`http://0bbfee1e.ngrok.io/volunteers/1`)
      .then(res => {
        console.log(res.data.volunteer_name);
        setVolunteer(res.data);
        // const VolName = res.data.name;
      })
      .catch(err => {
        console.log("Volunteer Dashboard:", err);
      });
  }, [setVolunteer]);

  //axios call for pickups
  useEffect(() => {
    axios
      .get("http://0bbfee1e.ngrok.io/pickups")
      .then(res => {
        console.log(res.data);
        setPickup(res.data);
        return console.log("this is pickup", pickup);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setPickup]);

  //axios call for business address
  useEffect(() => {
    axios
      .get("http://0bbfee1e.ngrok.io/restaurants/")
      .then(res => {
        console.log(res.data);
        setAddress(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setAddress]);

  // function Scheduled() {
  //   if (pickup === []) {
  //     return <h2>None</h2>;
  //   } else {
  //     pickup.map(p => {
  //       if (p.volunteer_id === volunteer.id) {
  //         // spread each of the pickup values as props into a card component:
  //         // console.log(volunteer.volunteer_id);
  //         // console.log(p);
  //         return <ScheduledPickupCards key={p.id} {...p} />;
  //       } else if (p.volunteer_id != null) {
  //         // console.log(volunteer.id);
  //         // console.log(p.volunteer_id);
  //         return null;
  //       }
  //     });
  //   }
  // }

  return (
    <div className="volDash-container">
      <div className="volDash-header">
        <img className="volDash-logo" src={logo} alt="logo" />
        <h1>REPLATE</h1>
      </div>
      <div className="volDash-UserClaimSection">
        <div className="volDash-UserSection">
          <img className="volDash-userImage" src={userImage} alt="user" />
          <h3 className="volDash-welcome">
            Welcome {volunteer.volunteer_name}!
          </h3>
        </div>
        <button className="volDash-button">Claim a Pickup</button>
      </div>
      <div className="volDash-section">
        <h3>Your Scheduled Pickups</h3>
        <div className="volDash-day-schedule__pickup">
          {pickup.map(p => {
            if (p.volunteer_id === volunteer.id) {
              // spread each of the pickup values as props into a card component:
              console.log(volunteer.volunteer_id);
              // console.log(p);
              return <ScheduledPickupCards key={p.id} {...p} />;
            } else if (p.volunteer_id != null) {
              // console.log(volunteer.id);
              // console.log(p.volunteer_id);
              return null;
            }
          })}
        </div>
      </div>
      <div className="volDash-section">
        <h3>Available Pickups</h3>
        <div className="volDash-day-schedule__pickup">
          {pickup.map(p => {
            if (p.volunteer_id === null) {
              // spread each of the pickup values as props into a card component:
              console.log(p);
              console.log("IN Available()");
              return <AvailablePickupCards key={p.id} {...p} />;
            } else if (p.volunteer_id != null) {
              return <h2>None</h2>;
            }
          })}
        </div>
      </div>
    </div>
  );
}