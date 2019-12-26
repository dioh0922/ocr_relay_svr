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

search_word = args[1]

img_list = glob.glob("./get_result/" + "*")
for i in img_list:
	os.remove(i)

crawler = GoogleImageCrawler(storage={"root_dir" : "get_result"})
crawler.crawl(keyword=search_word, max_num=3)
