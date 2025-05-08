package ch.brodydan.cifake_detector;

import ai.djl.inference.Predictor;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.Image;
import ai.djl.modality.cv.ImageFactory;
import ai.djl.repository.zoo.ZooModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PredictionController {

    @Autowired(required = false)
    private ZooModel<Image, Classifications> model;

    @GetMapping("/api/predict")
    public String predictUrl(@RequestParam(required = false) String imageUrl) {
        if (model == null) {
            return "⚠️ Model not loaded.";
        }
        try {
            String url = (imageUrl != null) ? imageUrl
                    : "https://resources.djl.ai/images/shoe.jpg";
            Image img = ImageFactory.getInstance().fromUrl(url);
            try (Predictor<Image, Classifications> p = model.newPredictor()) {
                var best = p.predict(img).best();
                return String.format("🔍 %s (%.2f%%)",
                        best.getClassName(), best.getProbability() * 100);
            }
        } catch (Exception e) {
            return "❌ Error: " + e.getMessage();
        }
    }

    @PostMapping(path = "/api/predict-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String predictFile(@RequestParam("file") MultipartFile file) {
        if (model == null) {
            return "⚠️ Model not loaded.";
        }
        try {
            Image img = ImageFactory.getInstance().fromInputStream(file.getInputStream());
            try (Predictor<Image, Classifications> p = model.newPredictor()) {
                var best = p.predict(img).best();
                return String.format("🔍 %s (%.2f%%)",
                        best.getClassName(), best.getProbability() * 100);
            }
        } catch (Exception e) {
            return "❌ Error: " + e.getMessage();
        }
    }
}
