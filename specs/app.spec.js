
import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import App from "../app/app.js";


describe("<App />", () => {

  // it("calls componentDidMount", () => {
  //   const wrapper = mount(<App />);
  //   expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  // });

  it("contains a <SearchBar /> component", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(SearchBar)).to.have.length(1);
  });

});
