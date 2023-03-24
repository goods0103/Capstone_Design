package com.hadoop.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(DemoApplication.class, args);
		
//		CrawlingExample crawlingExample = new CrawlingExample("https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/");
//		crawlingExample.process();

//		CrawlingPassmark crawlingPassmark = new CrawlingPassmark("https://www.cpubenchmark.net/cpu_list.php");
//		crawlingPassmark.process();
	}

}
