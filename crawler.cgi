#!/usr/local/bin/python3
#_*_ coding: utf-8 _*__

import sys
import io
import os
import glob
from icrawler.builtin import GoogleImageCrawler

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, "UTF-8")

args = sys.argv

#引数チェック ファイル名を指定する
if 2 > len(args):
	print("引数が少なすぎます")
	exit(1)

search_word = args[0]
print(search_word)
