
export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument.trim() == '' || argument == undefined) {
      return false;
    }
  }
  return true;
}

export const initMenu = (router, store, to)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  var fmtRoutes = formatRoutes(store.state.menuItems);

  router.addRoutes(fmtRoutes);
  store.commit('initMenu', fmtRoutes);

  const targetRouter = to.path + '';

  //用来解决动态路由下，页面刷新显示空白的问题。
  router.push({ name: 'Redirect', params:{targetRouter}});
}

export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      desc,
      meta,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
          if (path == "/home") {
            require(['../page/' + component + '.vue'], resolve);
          } else if (path.startsWith("/system")){
            require(['../page/system/' + component + '.vue'], resolve);
          } else if (path.startsWith("/systools")){
            require(['../page/systools/' + component + '.vue'], resolve);
          }
      },
      desc: desc,
      meta: meta,
      name: name,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
