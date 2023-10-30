import time
from datetime import datetime
from dfa_lib_python.attribute import Attribute
from dfa_lib_python.attribute_type import AttributeType
from dfa_lib_python.dataflow import Dataflow
from dfa_lib_python.dataset import DataSet
from dfa_lib_python.element import Element
from dfa_lib_python.program import Program
from dfa_lib_python.set import Set
from dfa_lib_python.set_type import SetType
from dfa_lib_python.task import Task
from dfa_lib_python.transformation import Transformation

dataflow_tag = "ChangeIPs"
df = Dataflow(dataflow_tag)

# Prospective provenance
tf1 = Transformation("GenerateSeed")
tf1_input1 = Set("iGenerateSeed", SetType.INPUT, [Attribute("seed", AttributeType.NUMERIC)])
tf1_output = Set("oGenerateSeed", SetType.OUTPUT, [Attribute("seed", AttributeType.TEXT)])
tf1.set_sets([tf1_input1,tf1_output])
df.add_transformation(tf1)

tf2 = Transformation("GenerateIP")
tf1_output.set_type(SetType.INPUT)
tf1_output.dependency=tf1._tag
tf2_output = Set("oGenerateIP", SetType.OUTPUT, [Attribute("ip", AttributeType.TEXT),Attribute("lastOctect", AttributeType.NUMERIC)])
tf2.set_sets([tf1_output,tf2_output])
df.add_transformation(tf2)

tf3 = Transformation("ModifyIP")
tf2_output.set_type(SetType.INPUT)
tf2_output.dependency=tf2._tag
tf3_output = Set("oModifyIP", SetType.OUTPUT, [Attribute("modified", AttributeType.TEXT)])
tf3.set_sets([tf2_output,tf3_output])
df.add_transformation(tf3)

df.save()

# Retrospective provenance
import socket
import random
import struct
GenerateSeed = Task(1, dataflow_tag, "GenerateSeed")
GenerateSeed_input = DataSet("iGenerateSeed", [Element([seed])])
GenerateSeed.add_dataset(GenerateSeed_input)
GenerateSeed.begin()

# Setar o valor para geração da semente
seed = 12345

# Setar a seed randomica
random.seed(seed)

GenerateSeed_output= DataSet("oGenerateSeed", [Element([seed])])
GenerateSeed.add_dataset(GenerateSeed_output)
GenerateSeed.end()
GenerateIP = Task(2, dataflow_tag, "GenerateIP", dependency=GenerateSeed)
GenerateIP.begin()
# gerar o IP randômico
random_ip = socket.inet_ntoa(struct.pack('>I', random.randint(1, 0xFFFFFFFF))
print("IP:", random_ip)

# Dar o Split no IP em octetos
ip_parts = random_ip.split('.')

# Modificar o IP (e.g., incrementar em 1 o último octeto)
last_octet = int(ip_parts[3])
last_octet = (last_octet + 1) % 256

GenerateIP_output= DataSet("oGenerateIP", [Element([random_ip,last_octet])])
GenerateIP.add_dataset(GenerateIP_output)
GenerateIP.end()
ModifyIP = Task(3, dataflow_tag, "ModifyIP")
ModifyIP.begin()
# Juntar o octeto modificado no IP
modified_ip = f"{ip_parts[0]}.{ip_parts[1]}.{ip_parts[2]}.{last_octet}"

print("IP modificado:", modified_ip)
ModifyIP_output= DataSet("oModifyIP", [Element([modified_ip])])
ModifyIP.add_dataset(ModifyIP_output)
ModifyIP.end()
