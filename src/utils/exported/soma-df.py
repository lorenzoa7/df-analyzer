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
tf1.set_sets([tf3_input1,tf3_output])
df.add_transformation(tf3)

tf4 = Transformation("ExecutarSoma")
tf3_output.set_type(SetType.INPUT)
tf3_output.dependency=tf3._tag
tf4_output = Set("oExecutarSoma", SetType.OUTPUT, [Attribute("RESULTADO_SOMA", AttributeType.NUMERIC)])
tf1.set_sets([tf3_output,tf4_output])
df.add_transformation(tf4)

df.save()

# Retrospective provenance
t1 = Task(t1, dataflow_tag, "ExtrairNumeros")
t1_input = DataSet("iExtrairNumeros", [Element(["/home/debora/Documents/numeros"])])
t1.add_dataset(t1_input)
t1.begin()
PRIMEIRO_NUMERO = 5
SEGUNDO_NUMERO = 1
t1_output= DataSet("oExtrairNumeros", [Element([PRIMEIRO_NUMERO,SEGUNDO_NUMERO])])
t1.add_dataset(t1_output)
t1.end()

t2 = Task(t2, dataflow_tag, "ExecutarSoma", dependency=t1)
t2.begin()
RESULTADO_SOMA = PRIMEIRO_NUMERO + SEGUNDO_NUMERO
t2_output= DataSet("oExecutarSoma", [Element([RESULTADO_SOMA])])
t2.add_dataset(t2_output)
t2.end()
