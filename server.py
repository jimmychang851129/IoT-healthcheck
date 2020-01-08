import psutil
import splunklib.client as client
import splunklib.results as results
import json
import os
import datetime
from argparse import ArgumentParser
import Config,jsonType
import socket

SplunkInfo = Config.SplunkInfo
# padding_task = []
#################
# time interval #
#################

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

# def SockConnection():
# 	HOST = 'ec2-34-238-131-243.compute-1.amazonaws.com' 
# 	PORT = 6666
# 	server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 	server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
# 	server_socket.bind((HOST, PORT))
# 	print("bind port...")
# 	server_socket.listen(10)
# 	sockfd, addr = server_socket.accept()
# 	print("addr = ",addr)

def main():
	# SockConnection()
	r = UploadToSplunk(ret)
	if r == 0:
		print("failed to upload data to splunk...")

if __name__ == "__main__":
	main()