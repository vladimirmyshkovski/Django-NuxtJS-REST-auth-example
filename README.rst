Django NustJS REST auth example
===============================

Django NustJS REST auth example

.. image:: https://img.shields.io/badge/code%20style-black-000000.svg
     :target: https://github.com/ambv/black
     :alt: Black code style

.. image:: https://travis-ci.org/narnikgamarnikus/Django-NuxtJS-REST-auth-example.svg?branch=master
     :target: https://travis-ci.org/narnikgamarnikus/Django-NuxtJS-REST-auth-example
     :alt: Travis CI

.. image:: https://codecov.io/gh/narnikgamarnikus/Django-NuxtJS-REST-auth-example/branch/master/graph/badge.svg
  :target: https://codecov.io/gh/narnikgamarnikus/Django-NuxtJS-REST-auth-example
  :alt: Codecov IO

:License: MIT

Basic Commands
--------------


Setting Up Your Users
^^^^^^^^^^^^^^^^^^^^^

* To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

* To create an **superuser account**, use this command::

    $ make superuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.


Type checks
^^^^^^^^^^^

Running type checks with mypy:

::

  $ make mypy


Test coverage
^^^^^^^^^^^^^

To run the tests, check your test coverage, and generate an HTML coverage report::

    $ make coverage
    $ open htmlcov/index.html

Running tests with py.test
~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  $ make test


Email Server
^^^^^^^^^^^^

In development, it is often nice to be able to see emails that are being sent from your application. For that reason local SMTP server `MailHog`_ with a web interface is available as docker container.

Container mailhog will start automatically when you will run all docker containers.
Please check `cookiecutter-django Docker documentation`_ for more details how to start all containers.

With MailHog running, to view messages that are sent by your application, open your browser and go to ``http://127.0.0.1:8025``

.. _mailhog: https://github.com/mailhog/MailHog



Sentry
^^^^^^

Sentry is an error logging aggregator service. You can sign up for a free account at  https://sentry.io/signup/?code=cookiecutter  or download and host it yourself.
The system is setup with reasonable defaults, including 404 logging and integration with the WSGI application.

You must set the DSN url in production.


Deployment
----------

The following details how to deploy this application.
