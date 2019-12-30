#!/usr/local/bin/python3
#_*_ coding: utf-8 _*__


import sys
import io
import os
import glob
import locale
from icrawler.builtin import GoogleImageCrawler
from icrawler.builtin import BingImageCrawler

sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8")
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

args = sys.argv

#引数チェック ファイル名を指定する
if 2 > len(args):
	print("argment error")
	exit(1)

img_list = glob.glob("./get_result/" + "*")
for i in img_list:
	os.remove(i)

search_word = args[1]


crawler = GoogleImageCrawler(storage={"root_dir" : "get_result"})
#crawler = BingImageCrawler(storage={"root_dir" : "get_result"})
crawler.crawl(keyword=search_word, max_num=3)
