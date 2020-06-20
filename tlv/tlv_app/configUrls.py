from .views import ConfigViewSet

config_list = ConfigViewSet.as_view({
  'get':'list',
  'post':'create'
})

config_detail = ConfigViewSet.as_view({
  'get':'retrieve',
  'put':'update',
  'patch':'partial_update',
  'delete':'destroy'
})