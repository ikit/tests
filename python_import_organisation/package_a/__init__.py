#!env/python3
# coding: utf-8

# En fait ça sert à rien le __all__ ... en python 3.5 en tout cas
#__all__ = ["common_a", "module_a1"] 


from package_a import common_a
from package_a import module_a1


from .common_a import *
