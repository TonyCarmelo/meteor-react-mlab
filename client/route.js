import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './mainLayout.js';
import App from '../imports/ui/App.js';
import ChartsApp from '../imports/ui/ChartsApp.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ForgetPinApp from '../imports/ui/ForgetPinApp.js';
import Admin from '../imports/ui/admin/Admin.js';
import AdminMain from '../imports/ui/admin/AdminMain.js'

injectTapEventPlugin();

FlowRouter.route("/", {
  action () {
    mount(MainLayout, {
      content: <App />,
    });
  }
});

FlowRouter.route("/view/:_partner", {
  action (params, queryParams) {
    mount(MainLayout, {
      content: <ChartsApp _partner={ params._partner} />,
    });
  }
});


FlowRouter.route("/forgetpin/:_partner", {
  action (params, queryParams) {
    mount(MainLayout, {
      content: <ForgetPinApp _partner={ params._partner} />,
    });
  }
});



FlowRouter.route("/adminlogin", {
  action () {
    mount(MainLayout, {
      content: <Admin />,
    });
  }
});

FlowRouter.route("/adminmain", {
  action () {
    mount(MainLayout, {
      content: <AdminMain />,
    });
  }
});


FlowRouter.route("/*", {
  action () {
    mount(MainLayout, {
      content: <App />,
    });
  }
});
