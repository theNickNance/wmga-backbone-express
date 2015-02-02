define(function(require) {
  'use strict';

  var ReviewBaseView = require('client/scripts/views/reviewbase');
  var DeleteView = require('client/scripts/views/delete');
  var AppSettings = require('client/scripts/appsettings');

  var UsersDetailView = ReviewBaseView.extend({
    template: JST['client/templates/users/review.ejs'],
    editButtonsTemplate: JST['client/templates/users/editbuttons.ejs'],

    events: {
      'click #delete-btn': 'showDeleteConfirm',
      'click #mark-paid': 'setPaid',
      'click #admin': 'setAdmin',
      'click #treasure': 'setTreasure',
      'click #team-btn': 'registerTeam',
      'click #team-btn-edit': 'manageTeam'
    },

    initialize: function(options) {
      ReviewBaseView.prototype.initialize.apply(this, arguments);
      this.teamCollection = options.dataManager.teamCollection;
    },

    render: function() {
      ReviewBaseView.prototype.render.apply(this, arguments);

      var isSignedUser = this.session.get('userid') === this.model.id;

      if (isSignedUser && !this.session.get('admin')) {
        this.$('.btn-toolbar').append(this.editButtonsTemplate(this));
      }
      if (this.session.get('email') !== 'nance.nick@gmail.com') {
        this.$('#admin').parent().remove();
        this.$('#treasure').parent().remove();
      }

      if (!this.session.get('treasure')) {
        this.$('#mark-paid').parent().remove();
      }

      if (this.model.get('paid') || !isSignedUser) {
        this.$('#member-unpaid').remove();
      }

      if (!this.model.has('teamid') || (this.model.get('teamid').length === 0)) {
        this.$('#team-btn-edit').remove();
      } else {
        this.$('#team-btn').remove();

        var team = this.teamCollection.get(this.model.get('teamid'));
        if (!team || (this.session.get('userid') !== team.get('captainid'))) {
          this.$('#team-btn-edit').remove();
        }
      }
      return this;
    },

    getFileUrl: function() {
      return AppSettings.fileURL + this.model.get('photo');
    },

    getPayNow: function() {
      return AppSettings.membershipPayNow + this.model.get('email');
    },

    showDeleteConfirm: function() {
      var view = new DeleteView({
        model: this.model,
        modelAttr: 'username',
        modelTypeName: 'user',
        successRoute: '#users'
      });
      this.$el.append(view.render().el);
      view.show();
    },

    setPaid: function(e) {
      e.preventDefault();
      this.model.save({paid: e.target.checked});
    },

    setAdmin: function(e) {
      e.preventDefault();
      this.model.save({admin: e.target.checked});
    },

    setTreasure: function(e) {
      e.preventDefault();
      this.model.save({treasure: e.target.checked});
    },

    registerTeam: function(e) {
      e.preventDefault();
      Backbone.history.navigate('#teams/create',true);
    },

    manageTeam: function(e) {
      e.preventDefault();
      Backbone.history.navigate('#teams/read/' + this.model.get('teamid'),true);
    }
  });

  return UsersDetailView;
});
