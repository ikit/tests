 
from common import *

def MyTool():
	parler("J'utilise la méthode parler défini dans common depuis le package_a")

class MyBaseClassA():
	def salut(self):
		print("MyBaseClassA from package_a.common_a")