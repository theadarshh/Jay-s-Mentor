package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.Policy;
import com.jaysmentor.backend.model.PolicyType;
import com.jaysmentor.backend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public Optional<Policy> getPolicy(PolicyType type) {
        return policyRepository.findByType(type);
    }

    public Policy savePolicy(Policy policy) {
        return policyRepository.save(policy);
    }
}
