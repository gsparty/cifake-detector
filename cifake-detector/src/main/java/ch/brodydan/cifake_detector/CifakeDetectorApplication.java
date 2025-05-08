package ch.brodydan.cifake_detector;

import ai.djl.Application;
import ai.djl.ModelException;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.Image;
import ai.djl.repository.zoo.Criteria;
import ai.djl.repository.zoo.ModelNotFoundException;
import ai.djl.repository.zoo.ZooModel;
import ai.djl.training.util.ProgressBar;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

@SpringBootApplication
public class CifakeDetectorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CifakeDetectorApplication.class, args);
    }

    /**
     * Loads a pretrained ImageNet classifier (ResNet50 by default)
     * from DJL’s MXNet model‑zoo. This happens at startup, both in
     * tests and at runtime.
     */
    @Bean
    public ZooModel<Image, Classifications> model()
            throws IOException, ModelNotFoundException, ModelException {
        return Criteria.builder()
                .optApplication(Application.CV.IMAGE_CLASSIFICATION)
                .setTypes(Image.class, Classifications.class)
                // Specify dataset=imagenet; default backbone is resnet50
                .optFilter("dataset", "imagenet")
                .optProgress(new ProgressBar())
                .build()
                .loadModel();
    }
}
