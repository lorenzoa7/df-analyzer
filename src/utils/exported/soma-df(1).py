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

dataflow_tag = "soma"
df = Dataflow(dataflow_tag)

# Prospective provenance
tf3 = Transformation("ExtrairNumeros")
tf3_input1 = Set("iExtrairNumeros", SetType.INPUT, [Attribute("SOMA_FILE", AttributeType.FILE)])
tf3_output = Set("oExtrairNumeros", SetType.OUTPUT, [Attribute("PRIMEIRO_NUMERO", AttributeType.NUMERIC),Attribute("SEGUNDO_NUMERO", AttributeType.NUMERIC)])
tf3.set_sets([tf3_input1,tf3_output])
df.add_transformation(tf3)

tf4 = Transformation("ExecutarSoma")
tf3_output.set_type(SetType.INPUT)
tf3_output.dependency=tf3._tag
tf4_output = Set("oExecutarSoma", SetType.OUTPUT, [Attribute("RESULTADO_SOMA", AttributeType.NUMERIC)])
tf4.set_sets([tf3_output,tf4_output])
df.add_transformation(tf4)

df.save()

# Retrospective provenance
tExtrairNumeros = Task(1, dataflow_tag, "ExtrairNumeros")
tExtrairNumeros_input = DataSet("iExtrairNumeros", [Element(["/home/debora/Documents/numeros"])])
tExtrairNumeros.add_dataset(tExtrairNumeros_input)
tExtrairNumeros.begin()
PRIMEIRO_NUMERO = 5
SEGUNDO_NUMERO = 1
tExtrairNumeros_output= DataSet("oExtrairNumeros", [Element([PRIMEIRO_NUMERO,SEGUNDO_NUMERO])])
tExtrairNumeros.add_dataset(tExtrairNumeros_output)
tExtrairNumeros.end()

tExecutarSoma = Task(2, dataflow_tag, "ExecutarSoma", dependency=tExtrairNumeros)
tExecutarSoma.begin()
RESULTADO_SOMA = PRIMEIRO_NUMERO + SEGUNDO_NUMERO
tExecutarSoma_output= DataSet("oExecutarSoma", [Element([RESULTADO_SOMA])])
tExecutarSoma.add_dataset(tExecutarSoma_output)
tExecutarSoma.end()
