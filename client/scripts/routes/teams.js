define([
  'client/scripts/routes/routerbase',
  'client/scripts/views/teams/index',
  'client/scripts/views/teams/list',
  'client/scripts/views/teams/review',
  'client/scripts/views/teams/form',
  ], function (BaseRouter, IndexView, ListView, ReviewView, FormView) {
    'use strict';

    var TeamsRouter = BaseRouter.extend({
      routes: {
        'teams': 'showList',
        'teams/create(:return)': 'showAddForm',
        'teams/read/:id': 'showReview',
        'teams/update/:id': 'showEditForm',
      },
      indexView: IndexView,
      listView: ListView,
      reviewView: ReviewView,
      formView: FormView
    });

    return TeamsRouter;
  });
