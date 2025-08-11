import tkinter as tk
import os
import math
import time

username = input("Enter your username: ")
password = input("Enter your password: ")

if username == "WD_DEVTEAM" and password == "temppass":
    admin_mode()


def admin_mode():
    #admin mode is for admins to see site data and admin pages
    #add admin tabs
