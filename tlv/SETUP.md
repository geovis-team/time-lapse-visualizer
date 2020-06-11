### Setup Backend
-----

This project uses MySQL as it's database. Thus, to setup MySQL one can follow these
[instructions](https://support.rackspace.com/how-to/install-mysql-server-on-the-ubuntu-operating-system/).

After installing MySQL, make a `user` and give the `user` privileges to make a database
(this is needed to create a `test database`). Create a `db` for the application and grant
privileges to the `user`. Add these details
to [settings.py](https://github.com/radhika1601/time-lapse-visualizer/blob/master/tlv/tlv/settings.py)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'tlv_db',
        'USER': 'tlv_user',
        'PASSWORD': 'Tlv_P4ss',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

After setting up the database install all the pip requirements.
```shell script
pip install -r requirements.txt
```
Now, migrate the database
```shell script
python manage.py migrate
```
and run the django server using 
```shell script
python manage.py runserver
``` 

To run tests
```shell script
python manage.py test
```
