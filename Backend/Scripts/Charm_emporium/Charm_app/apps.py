from django.apps import AppConfig


class CharmAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Charm_app'

class InventoryConfig(AppConfig):
    name = 'inventory'


class HomepageConfig(AppConfig):
    name = 'homepage'



class TransactionsConfig(AppConfig):
    name = 'transactions'

