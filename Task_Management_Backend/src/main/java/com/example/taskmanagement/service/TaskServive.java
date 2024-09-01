package com.example.taskmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.repository.TaskRepository;

@Service
public class TaskServive {

	@Autowired
	private TaskRepository taskRepository;

	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	public Task getTaskById(Long id) {
		return taskRepository.findById(id).orElse(null);
	}

	public Task saveTask(Task task) {
		return taskRepository.save(task);
	}

	public void deleteTask(Long id) {
		taskRepository.deleteById(id);
	}
}
