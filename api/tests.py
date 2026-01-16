from django.core.exceptions import ValidationError
from django.test import TestCase

from api.models import SiteStat


class IncrementClicksTestCase(TestCase):

    def test_increment_clicks(self):
        self.model = SiteStat()
        initial_clicks = self.model.button_clicks
        self.model.increment_clicks()
        self.assertEqual(self.model.button_clicks, initial_clicks + 1)

    def test_singleton_enforcement(self):
        SiteStat.objects.create()

        with self.assertRaises(ValidationError):
            stat2 = SiteStat()
            stat2.save()
