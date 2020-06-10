from django.test import TestCase
from .models import Project
import random

class ProjectTestCase(TestCase):
    """
    This class tests the Project model.
    """
    count_added = 0
    @staticmethod
    def get_random_bool():
        """ This method returns a random boolean value."""
        rand_bit = random.getrandbits(1)
        return bool(rand_bit)

    def get_shop(self):
        """This method returns an appropriate random json
        generated for shop field."""
        pharmacy = self.get_random_bool()
        grocery = self.get_random_bool()
        restaurant = self.get_random_bool()
        shop = pharmacy | grocery | restaurant
        if shop:
            json = {
                "pharmacy": pharmacy,
                "grocery": grocery,
                "restaurant": restaurant
            }
            return json
        return

    def get_hospital(self):
        """This method returns an appropriate random json
        generated for hospital field."""
        government = self.get_random_bool()
        private = self.get_random_bool()
        blood_bank = self.get_random_bool()
        hospital = government | private | blood_bank
        if hospital:
            json = {
                "government": government,
                "private": private,
                "blood_bank": blood_bank
            }
            return json
        return

    def get_transport_station(self):
        """This method returns an appropriate random json
        generated for transport_station field."""
        bus_stand = self.get_random_bool()
        railway_station = self.get_random_bool()
        airport = self.get_random_bool()
        transport_station = bus_stand | railway_station | airport
        if transport_station:
            json = {
                "bus_stand": bus_stand,
                "railway_station": railway_station,
                "airport": airport
            }
            return json
        return

    @staticmethod
    def get_time():
        """This method returns a random date in suitable format."""
        yr = random.randint(2000, 2020)
        month = random.randint(1, 12)
        date = random.randint(1, 28)
        time = f"{yr}-{month}-{date}"
        return time

    def setUp(self):
        """
        This function adds some random entries to the test database.
        :return: None
        """
        self.count_added = Project.objects.all().count()
        for i in range(100):
            latitude = random.randint(-90000, 90000)/100
            longitude = random.randint(-180000, 180000) / 100
            time = self.get_time()
            shop = self.get_shop()
            hospital = self.get_hospital()
            transport_station = self.get_transport_station()
            if (shop != None) or (hospital != None) or (transport_station != None) :
                self.count_added += 1
                Project.objects.create(
                    latitude=latitude,
                    longitude=longitude,
                    time=time,
                    shop=shop,
                    hospital=hospital,
                    transport_station=transport_station
                )

    def test_if_projects_are_added(self):
        """
        This method asserts if the projects to be added in setup
        method add correctly.
        :return:
        """
        count = Project.objects.all().count()
        assert count == self.count_added
