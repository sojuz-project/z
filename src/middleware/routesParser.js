// import { ContextualizedQueryLatencyStats } from 'apollo-engine-reporting-protobuf';
import { nextTick } from 'q';

export default (context) => {
  const { route, next } = context;
  if (route.params.page) {
    route.params.page = parseInt(route.params.page);
    // console.log(route.params);
    context.app.route = route;
    // next(context);
  }
  // console.dir(context, { depth: null });
  // context.code = 200;
  // next(context);
  // console.log(context.req);
  // return context;
};
