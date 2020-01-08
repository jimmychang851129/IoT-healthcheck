import psutil
import time,os
import socket
import jsonType, Config
import datetime
import server # tmp

##########
# config #
##########
bashpath = "/Users/jimmy/.zsh_history"
bashcnt = "/Users/jimmy/Desktop/IoT-healthcheck/bash_cnt"
danger_cmd = [
	"/bin/sh",
	"/bin/bash",
	"/etc/",
	"/var/",
]
device = 'mac'


ServerInfo = Config.ServerHost

############
# get time #
############
def getTime():
	t = datetime.datetime.now()
	d = t.strftime("%Y-%m-%d %H:%M:%S")
	k = int(t.strftime("%Y%m%d%H%M%S"))
	return d,k

############################
# system status inspection #
############################
def ReportStatus():
	cpu_usage = psutil.cpu_percent()
	memory_usage = dict(psutil.virtual_memory()._asdict())
	document = dict(jsonType.systemStatus)
	document['CPU_Usage']= cpu_usage
	document['Memory_Usage'] = memory_usage
	document['date'],document['timestamp'] = getTime()
	document['device'] = device
	return document

##################
# log inspection #
##################
def ReportSyslog():
	t = 0
	l = []
	warn = []
	cnt = 0
	with open(bashcnt,'r') as f:
		t = int(f.read().strip())
	with open(bashpath) as f:
		for line in f:
			if cnt >= t:
				l.append(line.strip())
			cnt += 1
	with open(bashcnt,'w') as fw:
		fw.write(str(cnt))
	for cmd in l:
		if cmd in danger_cmd:
			warn.append(cmd)
	document = dict(jsonType.systemLog)
	if len(warn) != 0:
		document['date'],document['timestamp'] = getTime()
		document['device'] = device
		document['log_info'] = warn
	else:
		document = 0
	return document


def ReportPM25(mode=0):
	data = []
	if mode == 0:
		with open("fake.txt",'r') as f:
			for line in f:
				data.append(float(line.strip()))
	return data

# def SockConnection():
# 	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 	print("start connection...")
# 	try:
# 	    sock.connect((ServerInfo['HOST'], ServerInfo['PORT']))
# 	    print("connection success")
# 	except:
# 	    print("Cannot connect to the server")

def main():
	data1 = ReportStatus()
	data2 = ReportSyslog()
	if server.UploadToSplunk(data1) == 0:
		print("[client.py] Upload data1 to splunk error")
	if data2 != 0:
		if server.UploadToSplunk(data2) == 0:
			print("[client.py] Upload data2 to splunk error")

if __name__ == "__main__":
	main()
