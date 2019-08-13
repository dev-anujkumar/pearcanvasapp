/* eslint-disable import/no-extraneous-dependencies */
/** Used in jest.config.js */

import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';
import expect from 'expect';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;