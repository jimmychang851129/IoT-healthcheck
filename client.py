import psutil
import splunklib.client as client
import splunklib.results as results
import json
import os
import datetime
from argparse import ArgumentParser
import Config,jsonType

SplunkInfo = Config.SplunkInfo

def getTime():
	t = datetime.datetime.now()
	d = t.strftime("%Y-%m-%d %H:%M:%S")
	k = int(t.strftime("%Y%m%d%H%M%S"))
	return d,k

def Splunk_Connection(index):
	service,Index = 0,0
	try:
		service = client.connect(
		    host=SplunkInfo['HOST'],
		    port=SplunkInfo['PORT'],
		    username=SplunkInfo['USERNAME'],
		    password=SplunkInfo['PASSWORD'])
		Index = service.indexes[index]
	except Exception,e:
		print("Splunk server connection error")
		print(str(e))
	return Index

def ReportStatus():
	cpu_usage = psutil.cpu_percent()
	memory_usage = dict(psutil.virtual_memory()._asdict())
	document = dict(jsonType.systemStatus)
	document['CPU_Usage']= cpu_usage
	document['Memory_Usage'] = memory_usage
	document['date'],document['timestamp'] = getTime()
	document['device'] = "mac"
	return document

def UploadToSplunk(document):
	ret = 0
	Index = 0
	try:
		Index = Splunk_Connection(SplunkInfo['DefaultIndex'])
		filename = document['device']+"_"+document['type']+"_"+str(document['timestamp'])
		print("fimename = ",filename)
		Index.submit(json.dumps(document),sourcetype='json',host=document['device'],source=filename)
		ret = 1
	except Exception,e:
		print("[client.py UploadToSplunk error]")
		print(str(e))
	finally:
		return ret

def main():
	ret = ReportStatus()
	print("ret = ",ret)
	r = UploadToSplunk(ret)
	if r == 0:
		print("failed to upload data to splunk...")

if __name__ == "__main__":
	main()