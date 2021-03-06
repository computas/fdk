package no.acat.harvester;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
public class HarvestQueue {
    private static final Logger logger = LoggerFactory.getLogger(HarvestQueue.class);
    private static Object syncObject = new Object();

    private LinkedList<HarvestTask> scheduledTasks = new LinkedList<>();

    public void addTask(HarvestTask task) {
        synchronized (syncObject) {
            if (scheduledTasks.contains(task)) {
                logger.debug("Task already exists in queue: {}", task);
                return;
            }
            scheduledTasks.add(task);
            logger.debug("Task added to queue: {}", task);
        }
    }

    public HarvestTask poll() {
        return scheduledTasks.poll();
    }
}
