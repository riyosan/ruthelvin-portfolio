/* ==========================================================================
   RUTH ELVIN HARIANJA - DATA SCIENCE, ML & AI PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticleCanvas();
  initProjectFilters();
  initSimulators();
  initModals();
});

/* --- 0. LIGHT MODE & NIGHT MODE THEME TOGGLE --- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!toggleBtn || !themeIcon) return;

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    if (isLight) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });
}

/* --- 1. NEURAL PARTICLE CANVAS BACKGROUND --- */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.floor((width * height) / 18000);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --- 2. PROJECT FILTERING SYSTEM --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

/* --- 3. LIVE INTERACTIVE SIMULATORS --- */
function initSimulators() {
  const distanceInput = document.getElementById('ews-distance');
  if (!distanceInput) return;
}

/* --- 4. PROJECT MODAL SYSTEM --- */
const projectModalData = {
  1: {
    title: "Early Warning System (EWS) Attendance Anomaly Detection Web App",
    subtitle: "Production Full-Stack Machine Learning Web App (Flask, PyOD, SHAP, Leaflet.js)",
    desc: "A production-grade Flask web application designed to detect attendance fraud (fake GPS, spatial jumps, and temporal mismatches) using PyOD ensemble outlier detection algorithms paired with SHAP explainability.",
    tech: ["Python", "Flask", "PyOD", "Isolation Forest", "LOF", "ECOD", "SHAP", "Leaflet.js", "Plotly", "Bootstrap"],
    metrics: "Live App: https://siset-eight.vercel.app/ | Precision: 94.2% | Recall: 91.8% | AUC-PR: 0.95 | Processing Time: <2.5s for 15,000 records",
    code: `import pyod.models.iforest as iforest
import pyod.models.lof as lof
import pyod.models.ecod as ecod
import shap

# Ensemble Majority Voting Pipeline
if_model = iforest.IForest(n_estimators=200, contamination=0.05)
lof_model = lof.LOF(n_neighbors=50, metric='minkowski')
ecod_model = ecod.ECOD()

# Fit Models & Voting Score Calculation
if_preds = if_model.fit_predict(X_scaled)
lof_preds = lof_model.fit_predict(X_scaled)
ecod_preds = ecod_model.fit_predict(X_scaled)

ensemble_vote = (if_preds + lof_preds + ecod_preds) >= 2

# SHAP Feature Attribution for Root Cause
explainer = shap.TreeExplainer(if_model.detector_)
shap_values = explainer.shap_values(X_scaled)
print("Primary Anomaly Feature:", feature_names[np.argmax(np.abs(shap_values[0]))])`
  },
  2: {
    title: "Geospatial & Spatio-Temporal Anomaly Scoring Dashboard",
    subtitle: "Interactive 3D Geospatial Analytics Platform (Streamlit, PyDeck 3D, ST-DBSCAN)",
    desc: "A 3D geospatial dashboard utilizing ST-DBSCAN (Spatio-Temporal DBSCAN) and Haversine distance calculations to compute dynamic office centroids and classify employee risk levels (LOW, MED, HIGH).",
    tech: ["Streamlit", "PyDeck 3D", "ST-DBSCAN", "Spatial DBSCAN", "Folium", "Haversine Distance", "Plotly"],
    metrics: "Live App: https://visual-presence.streamlit.app/ | Clustering Radius: 100m | Temporal Window: 1.0 hr | Risk Stratification: LOW (0-1), MED (2-3), HIGH (>=4)",
    code: `from sklearn.cluster import DBSCAN
from haversine import haversine, Unit

# ST-DBSCAN Dual Threshold Clustering
coords_rad = np.radians(df[['lat', 'long']])
kms_per_radian = 6371.0088

db_spatial = DBSCAN(eps=0.1/kms_per_radian, min_samples=3, metric='haversine')
df['cluster_spatial'] = db_spatial.fit_predict(coords_rad)

# Multi-Factor Weighted Risk Scoring
def calculate_risk(row):
    score = 0
    if row['dist_km'] > 50: score += 3  # Fake GPS signal
    elif row['dist_km'] > 5: score += 2  # Very Far
    if row['is_spatial_noise'] == -1: score += 1
    if row['has_official_note']: score -= 1
    return 'HIGH' if score >= 4 else ('MED' if score >= 2 else 'LOW')`
  },
  3: {
    title: "Beverages Sales Time Series Forecasting Engine",
    subtitle: "Deep Learning & Econometric Comparative Forecasting (TensorFlow/Keras, ARIMA)",
    desc: "A comparative time series forecasting engine evaluating TensorFlow/Keras LSTM Neural Networks against classical ARIMA models on 55,572 multi-store retail sales transactions (2013-2017).",
    tech: ["TensorFlow", "Keras", "LSTM", "ARIMA", "Statsmodels", "Pandas", "Seaborn"],
    metrics: "LSTM RMSE: 12.45 | ARIMA RMSE: 28.90 | LSTM MAPE: 8.4% (Outperformed ARIMA on holiday zero-sales drop-offs)",
    code: `from keras.models import Sequential
from keras.layers import LSTM, Dense, Dropout
from statsmodels.tsa.arima.model import ARIMA

# LSTM Architecture with Exogenous Features (onpromotion & oil price)
model = Sequential([
    LSTM(units=64, input_shape=(window_size, 3), return_sequences=True),
    LSTM(units=16),
    Dropout(0.2),
    Dense(units=1, activation='linear')
])

model.compile(optimizer='adam', loss='mse', metrics=['RootMeanSquaredError'])
history = model.fit(X_train, y_train, epochs=100, batch_size=32, validation_split=0.05)`
  },
  4: {
    title: "Credit Card Fraud Detection & Behavioral Pipeline",
    subtitle: "Financial Data Science & Imbalanced Machine Learning (Scikit-Learn, Random Forest)",
    desc: "A high-precision fraud detection engine built for extreme class imbalance (0.58% fraud rate) leveraging transaction velocity, time deltas, rolling averages, and merchant Haversine distance.",
    tech: ["Python", "Scikit-Learn", "Random Forest", "Logistic Regression", "Feature Engineering", "Pandas"],
    metrics: "PR-AUC: 0.92 | Recall: 89.6% | Class Imbalance Ratio: 0.58% positive fraud rate",
    code: `# Complex Feature Engineering Pipeline
df['diff_trans'] = df.groupby('card_id')['trans_time'].diff().dt.total_seconds() / 60.0
df['velocity_1h'] = df.groupby('card_id')['trans_time'].rolling('1h').count()
df['RollingAvg_3'] = df.groupby('card_id')['amount'].transform(lambda x: x.rolling(3).mean())
df['AboveAvgFlag'] = (df['amount'] > 2 * df['AvgTransactionAmount']).astype(int)

# Balanced Random Forest Classifier
rf_model = RandomForestClassifier(n_estimators=200, class_weight='balanced', random_state=42)
rf_model.fit(X_train, y_train)`
  },
  5: {
    title: "Metaheuristic Optimization & Neural Algorithm Development",
    subtitle: "AI & Optimization Algorithms Built From Scratch (Python, NumPy)",
    desc: "Custom Genetic Algorithm (GA) implementation for multi-constraint activity scheduling and a Perceptron Artificial Neural Network built from scratch with exact convergence tracking.",
    tech: ["Python", "NumPy", "Genetic Algorithms", "Perceptron", "Optimization", "Jupyter"],
    metrics: "Convergence Speed: 35 generations | Multi-Constraint Penalty Satisfaction: 100%",
    code: `class SchedulingGA:
    def __init__(self, population_size=50, generations=50):
        self.pop_size = population_size
        self.generations = generations
        
    def calculate_fitness(self, individual):
        violations = 0
        # Constraint 1: Activity A before B
        if individual[0] + 2 > individual[1]: violations += 1
        # Constraint 2: Non-overlapping C & D
        if not (individual[2] >= individual[3]+4 or individual[3] >= individual[2]+2): violations += 1
        return max(0, 10 - violations)

    def run(self):
        pop = [self.create_individual() for _ in range(self.pop_size)]
        # Evolutionary loop with tournament selection & crossover`
  }
};

function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalMetrics = document.getElementById('modal-metrics');
  const modalCode = document.getElementById('modal-code');

  window.openProjectModal = function(id) {
    const data = projectModalData[id];
    if (!data || !backdrop) return;

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalDesc.textContent = data.desc;
    modalMetrics.textContent = data.metrics;
    modalCode.textContent = data.code;

    modalTech.innerHTML = '';
    data.tech.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = t;
      modalTech.appendChild(tag);
    });

    backdrop.classList.add('active');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }
}

/* --- 5. LIVE APP TAB SWITCHER --- */
window.switchLiveTab = function(appType) {
  const btnStreamlit = document.getElementById("tab-streamlit-btn");
  const btnFlask = document.getElementById("tab-flask-btn");
  const embedStreamlit = document.getElementById("embed-streamlit");
  const embedFlask = document.getElementById("embed-flask");

  if (!btnStreamlit || !btnFlask || !embedStreamlit || !embedFlask) return;

  if (appType === "streamlit") {
    embedStreamlit.style.display = "block";
    embedFlask.style.display = "none";
    btnStreamlit.classList.add("active-tab-indigo");
    btnFlask.classList.remove("active-tab-rose");
  } else {
    embedStreamlit.style.display = "none";
    embedFlask.style.display = "block";
    btnFlask.classList.add("active-tab-rose");
    btnStreamlit.classList.remove("active-tab-indigo");
  }
};
